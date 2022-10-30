import crocks from 'crocks'
import * as R from 'ramda'

const { take, propOr, pathOr, sortWith, ascend, descend, __, filter, gt, compose, groupBy, reduce, values, keys, reverse, prop, identity, pluck, path, map, find, propEq, uniq, concat } = R

const { Async, ReaderT } = crocks
const { of, ask, lift } = ReaderT(Async)
const CACHE = 'https://cache.permapages.app'
const DAY = (24 * 60 * 60 * 1000)

const connect = (warp, wallet) => contract => warp.pst(contract).connect(wallet).setEvaluationOptions({
  allowUnsafeClient: true,
  internalWrites: true,
  allowBigInt: true
})
const getState = contract => Async.fromPromise(fetch)(`${CACHE}/${contract}`)
  .chain(res => Async.fromPromise(res.json.bind(res))())

export const getBalance = (contract, addr) => ask(({ warp, wallet }) =>
  getState(contract)
    .bichain(
      _ => connect(warp, wallet)(contract)
        .chain(pst => Async.fromPromise(pst.readState.bind(pst))())
        .map(prop('state')),
      Async.Resolved
    )
    .map(pathOr(0, ['balances', addr]))
    .map(x => (console.log(x), x))

).chain(lift)

export const whatsHot = (contract, days = 1) => ask(({ warp, wallet, arweave }) =>
  getState(contract)
    .bichain(
      _ => connect(warp, wallet)(contract)
        .chain(pst => Async.fromPromise(pst.readState.bind(pst))())
        .map(prop('state')),
      Async.Resolved
    )
    .map(prop('stamps'))
    .map(values)
    .map(filter(o => o.asset.length === 43))
    //.map(filter(compose(gt(__, Date.now() - (DAY * days)), prop('timestamp'))))
    .map(reverse)
    .map(groupBy(prop('asset')))
    .map(assets => reduce((a, x) => [
      ...a,
      {
        asset: x,
        count: assets[x].length,
        stampers: assets[x].map((o) => o.address),
        firstStamped: assets[x][assets[x].length - 1].timestamp,
        lastStamped: assets[x][0].timestamp
      },
    ], [], keys(assets)
    ))
    .map(sortWith([descend(prop('count'))]))
    .map(filter(compose(gt(__, Date.now() - (DAY * days)), prop('firstStamped'))))
    .map(take(25))
    .chain(assets => {
      const ids = pluck('asset', assets)
      const query = buildQuery(ids)
      return Async.fromPromise(arweave.api.post.bind(arweave.api))('graphql', { query })
        .map(compose(
          map(n => ({
            id: n.id,
            title: prop('value', find(propEq('name', 'Title'), n.tags) || find(propEq('name', 'Page-Title'), n.tags)),
            description: propOr('', 'value', find(propEq('name', 'Description'), n.tags)),
            type: propOr('page', 'value', find(propEq('name', 'Type'), n.tags))
          })),
          pluck('node'),
          path(['data', 'data', 'transactions', 'edges'])
        ))

        .map(nodes => {
          const getTitle = id => compose(prop('title'), find(propEq('id', id)))(nodes)
          const getDescription = id => compose(prop('description'), find(propEq('id', id)))(nodes)
          const getType = id => compose(prop('type'), find(propEq('id', id)))(nodes)
          return map(a => ({ ...a, title: getTitle(a.asset), description: getDescription(a.asset), type: getType(a.asset) }), assets)
        })
      //.map(x => (console.log(x), x))
    })
    // stampers name and avatar with one gql call?
    .chain(assets => {
      const stampers = uniq(reduce(concat, [], pluck('stampers', assets)))
      const query = buildProfileQuery(stampers)
      return Async.fromPromise(arweave.api.post.bind(arweave.api))('graphql', { query })
        .map(compose(
          map(profile => ({
            id: profile.owner.address,
            name: prop('value', find(propEq('name', 'Profile-Name'), profile.tags)),
            avatar: prop('value', find(propEq('name', 'Profile-Avatar'), profile.tags))
          })),
          pluck('node'),
          path(['data', 'data', 'transactions', 'edges'])
        ))
        .map(profiles => {

          return map(asset => {
            return ({
              ...asset, stampers: map(stamper => {
                const profile = find(propEq('id', stamper), profiles)
                return {
                  id: stamper,
                  name: profile?.name || 'unknown',
                  avatar: profile?.avatar
                }
              }, asset.stampers)
            })
          }, assets)
        })
    })
    .map(filter(a => a.title))
).chain(lift)


export const listStampers = (contract) =>
  ask(({ warp, wallet }) =>
    getState(contract)
      .bichain(
        _ => connect(warp, wallet)(contract)
          .chain(pst => Async.fromPromise(pst.readState.bind(pst))())
          .map(prop('state')),
        Async.Resolved
      )
      .map(prop('stamps'))
      .map(values)
      .map(reverse)

      .map(groupBy((s) => s.address))
      .map(stampers => reduce((a, x) => [
        ...a,
        {
          stamper: x,
          count: stampers[x].length,
          assets: stampers[x].map((o) => o.asset),
        },
      ], [], keys(stampers)
      ))
  )
    .chain(lift)

export const whatsNew = (contract, days) =>
  of(contract)
    .chain(contract =>
      ask(({ warp, wallet, arweave }) =>
        getState(contract)
          .bichain(
            _ => connect(warp, wallet)(contract)
              .chain(pst => Async.fromPromise(pst.readState.bind(pst))())
              .map(prop('state')),
            Async.Resolved
          )
          .map(prop('stamps'))
          .map(values)
          .map(filter(o => o.asset.length === 43))
          .map(reverse)
          .map(groupBy((s) => s.asset))
          .map(assets => reduce((a, x) => [
            ...a,
            {
              asset: x,
              count: assets[x].length,
              stampers: assets[x].map((o) => o.address),
              firstStamped: assets[x][assets[x].length - 1].timestamp,
              lastStamped: assets[x][0].timestamp
            },
          ], [], keys(assets)
          ))
          .map(filter(compose(gt(__, Date.now() - (DAY * days)), prop('firstStamped'))))
          .map(take(25))
          .chain(assets => {
            const ids = pluck('asset', assets)
            const query = buildQuery(ids)
            return Async.fromPromise(arweave.api.post.bind(arweave.api))('graphql', { query })
              .map(compose(
                map(n => ({
                  id: n.id,
                  title: propOr('No Title', 'value',
                    find(propEq('name', 'Title'), n.tags) ||
                    find(propEq('name', 'Page-Title'), n.tags)
                  ),
                  description: propOr('', 'value', find(propEq('name', 'Description'), n.tags)),
                  type: propOr('page', 'value', find(propEq('name', 'Type'), n.tags))
                })

                ),
                pluck('node'),
                path(['data', 'data', 'transactions', 'edges'])
              ))

              .map(nodes => {
                const getTitle = id => compose(prop('title'), find(propEq('id', id)))(nodes)
                const getDescription = id => compose(prop('description'), find(propEq('id', id)))(nodes)
                const getType = id => compose(prop('type'), find(propEq('id', id)))(nodes)
                return map(a => ({ ...a, title: getTitle(a.asset), description: getDescription(a.asset), type: getType(a.asset) }), assets)
              })
          })
          // stampers name and avatar with one gql call?
          .chain(assets => {
            const stampers = uniq(reduce(concat, [], pluck('stampers', assets)))
            const query = buildProfileQuery(stampers)
            return Async.fromPromise(arweave.api.post.bind(arweave.api))('graphql', { query })
              .map(compose(
                map(profile => ({
                  id: profile.owner.address,
                  name: prop('value', find(propEq('name', 'Profile-Name'), profile.tags)),
                  avatar: prop('value', find(propEq('name', 'Profile-Avatar'), profile.tags))
                })),
                pluck('node'),
                path(['data', 'data', 'transactions', 'edges'])
              ))
              .map(profiles => {

                return map(asset => {
                  return ({
                    ...asset, stampers: map(stamper => {
                      const profile = find(propEq('id', stamper), profiles)
                      return {
                        id: stamper,
                        name: profile?.name || 'unknown',
                        avatar: profile?.avatar
                      }
                    }, asset.stampers)
                  })
                }, assets)
              })
          })
          .map(filter(a => a.title))
      ).chain(lift)

    )

// get asset Page-Title and asset stampers in batches to avoid so many gql calls.

const buildQuery = (ids) => `
  query {
    transactions(first: 100, ids: ${JSON.stringify(ids)}) {
      edges {
        node {
          id
          tags {
            name 
            value
          }
        }
      }
    }
  }
`

const buildProfileQuery = (owners) => `
  query {
    transactions(first: 100, owners: ${JSON.stringify(owners)}, tags: [
      {name: "Protocol", values: ["PermaProfile-v0.1"]}
    ]) {
      edges {
        node {
          id
          owner {
            address
          }
          tags {
            name
            value
          }
        }
      }
    }
  }
`
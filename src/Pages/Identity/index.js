import Login from '../../components/Login/Login';

export function Identity() {
  return (
    <>
      <div className="text-container">
        <h2>Identity needs Security</h2>
        <p className="site-introduction">
          Identity is a topic that Arweave is looking to solve in multiple different ways. As our connection to the world grows,
          we need to be able to connect with the people and communities that we are connected to, with the Identity that we are
          comfortable with. Some of these are security risks to personal safety, privacy, and trust.
        </p>
      </div>
      <Login />
    </>
  )
}

export default Identity;
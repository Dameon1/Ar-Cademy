const initProvider = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (provider) {
      setProvider(undefined);
      setBundler(undefined);
      setAddress(undefined);
      return;
    }

    const pname = selection as string;
    const cname = currency as string;
    const p = providerMap[pname] // get provider entry
    const c = currencyMap[cname]
    console.log(`loading: ${pname} for ${cname}`)
    const providerInstance = await p(c.opts).catch((e: Error) => { toast({ status: "error", title: `Failed to load provider ${pname}`, duration: 10000 }); console.log(e); return; })
    setProvider(providerInstance)
  };

  const initBundlr = async () => {
    const bundlr = new WebBundlr(bundlerHttpAddress, currency, provider, { providerUrl: rpcUrl })
    try {
      // Check for valid bundlr node
      await bundlr.utils.getBundlerAddress(currency)
    } catch {
      toast({ status: "error", title: `Failed to connect to bundlr ${bundlerHttpAddress}`, duration: 10000 })
      return;
    }
    try {
      await bundlr.ready();
    } catch (err) {
      console.log(err);
    } //@ts-ignore
    if (!bundlr.address) {
      console.log("something went wrong");
    }
    toast({ status: "success", title: `Connected to ${bundlerHttpAddress}` })
    setAddress(bundlr?.address)
    setBundler(bundlr);
  }
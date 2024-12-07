import { useEffect, useState } from "react"

function useIsOnMobile() {
  const [isOnMobile, setIsOnMobile] = useState(false);
  function checkIsOnMobile() {
   window.matchMedia("(max-width: 868px)").matches
   ? setIsOnMobile(true) : setIsOnMobile(false)
  }
  useEffect(() => {
    checkIsOnMobile()
    window.addEventListener("resize", checkIsOnMobile);

    return () => {
      window.removeEventListener("resize", checkIsOnMobile);
    }
  }, [])
  return {
    isOnMobile
  }
}
export default useIsOnMobile
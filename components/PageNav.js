import { useRouter } from "next/router"

export default function PageNav() {
   const router = useRouter();
   return(
      <>
         <div>yoyoyo</div>
         <div>pathname: { router.pathname }</div>
      </>
   )
}

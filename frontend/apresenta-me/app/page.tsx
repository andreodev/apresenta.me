import { authOptions } from "@/lib/auth";
import HomeGetPage from "@/modules/home/pages/home-get-page";
import { getServerSession } from "next-auth";

//serve como ponto de entrada para a aplicação, e vai renderizar o componente HomeGetPage

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log("Session:", session);

  return (
    <HomeGetPage />
  );
}

import Kin from "@ledgerhq/hw-app-kin";

export default async transport => {
  const kinApi = new Kin(transport);
  const result = await kinApi.getPublicKey("44'/2017'/0'", true, true);
  console.log(result);
  return result;
};

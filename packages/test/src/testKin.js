import Kin from "@ledgerhq/hw-app-kin";

export default async transport => {
  const kinApi = new Kin(transport);
  const result = await kinApi.getAppConfiguration();
  return result;
};

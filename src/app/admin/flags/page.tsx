import { notFound } from "next/navigation";
import registryData from "../../../../flags/registry.json";
import { FlagRegistryItem } from "@/config/featureFlags";
import { FlagDashboard } from "./_components/flagDashboard";

const registryList = registryData as FlagRegistryItem[];

const Page = () => {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <h1 className="text-xs-center" style={{ marginBottom: "0.5rem" }}>
              Feature Flag Manager
            </h1>
            <p className="text-xs-center" style={{ color: "#818a91", marginBottom: "2rem" }}>
              Internal dashboard for managing feature flags. Trigger removal to create a PR via Devin.
            </p>
            <FlagDashboard flags={registryList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

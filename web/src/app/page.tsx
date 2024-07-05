// when user clicks login link, redirect them to https://login.eveonline.com/v2/oauth/authorize/
// with the following query parameters:
// response_type=code
// redirect_uri=http://localhost:3000/callback
// client_id=process.env.ESI_CLIENT_ID
// scope=publicData esi-location.read_location.v1 esi-location.read_ship_type.v1 esi-skills.read_skills.v1 esi-skills.read_skillqueue.v1 esi-wallet.read_character_wallet.v1 esi-wallet.read_corporation_wallet.v1 esi-search.search_structures.v1 esi-clones.read_clones.v1 esi-universe.read_structures.v1 esi-killmails.read_killmails.v1 esi-assets.read_assets.v1 esi-planets.manage_planets.v1 esi-fittings.read_fittings.v1 esi-markets.structure_markets.v1 esi-characters.read_loyalty.v1 esi-characters.read_chat_channels.v1 esi-characters.read_medals.v1 esi-characters.read_standings.v1 esi-characters.read_agents_research.v1 esi-industry.read_character_jobs.v1 esi-markets.read_character_orders.v1 esi-characters.read_blueprints.v1 esi-location.read_online.v1 esi-contracts.read_character_contracts.v1 esi-clones.read_implants.v1 esi-characters.read_fatigue.v1 esi-wallet.read_corporation_wallets.v1 esi-assets.read_corporation_assets.v1 esi-corporations.read_blueprints.v1 esi-contracts.read_corporation_contracts.v1 esi-corporations.read_standings.v1 esi-industry.read_corporation_jobs.v1 esi-markets.read_corporation_orders.v1 esi-industry.read_character_mining.v1 esi-corporations.read_medals.v1 esi-characters.read_titles.v1 esi-characters.read_fw_stats.v1 esi-corporations.read_fw_stats.v1 esi-characterstats.read.v1
// state=unique-state
const scopes = [
  "publicData",
  "esi-location.read_location.v1",
  "esi-location.read_ship_type.v1",
  "esi-skills.read_skills.v1",
  "esi-skills.read_skillqueue.v1",
  "esi-wallet.read_character_wallet.v1",
  "esi-wallet.read_corporation_wallet.v1",
  "esi-search.search_structures.v1",
  "esi-clones.read_clones.v1",
  "esi-universe.read_structures.v1",
  "esi-killmails.read_killmails.v1",
  "esi-assets.read_assets.v1",
  "esi-planets.manage_planets.v1",
  "esi-fittings.read_fittings.v1",
  "esi-markets.structure_markets.v1",
  "esi-characters.read_loyalty.v1",
  "esi-characters.read_chat_channels.v1",
  "esi-characters.read_medals.v1",
  "esi-characters.read_standings.v1",
  "esi-characters.read_agents_research.v1",
  "esi-industry.read_character_jobs.v1",
  "esi-markets.read_character_orders.v1",
  "esi-characters.read_blueprints.v1",
  "esi-location.read_online.v1",
  "esi-contracts.read_character_contracts.v1",
  "esi-clones.read_implants.v1",
  "esi-characters.read_fatigue.v1",
  "esi-wallet.read_corporation_wallets.v1",
  "esi-assets.read_corporation_assets.v1",
  "esi-corporations.read_blueprints.v1",
  "esi-contracts.read_corporation_contracts.v1",
  "esi-corporations.read_standings.v1",
  "esi-industry.read_corporation_jobs.v1",
  "esi-markets.read_corporation_orders.v1",
  "esi-industry.read_character_mining.v1",
  "esi-corporations.read_medals.v1",
  "esi-characters.read_titles.v1",
  "esi-characters.read_fw_stats.v1",
  "esi-corporations.read_fw_stats.v1",
  "esi-characterstats.read.v1",
];

function getLoginUrl() {
  const redirect_uri = "http://localhost:8080/auth/callback";
  const client_id = process.env.ESI_CLIENT_ID;
  const scope = scopes.join(" ");
  const state = crypto.randomUUID();
  return `https://login.eveonline.com/v2/oauth/authorize/?response_type=code&redirect_uri=${redirect_uri}&client_id=${client_id}&scope=${scope}&state=${state}`;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a
          href={getLoginUrl()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </a>
      </div>
    </main>
  );
}

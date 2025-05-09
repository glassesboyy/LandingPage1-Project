"use client";

import { getCoinById } from "@/components/data/coin-data";
import { Component as ChartLineInteractive } from "@/components/ui/chart-line-interactive";
import {
  IconArrowLeft,
  IconBox,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandReddit,
  IconBrandTelegram,
  IconBrandTwitter,
  IconChartBar,
  IconCopy,
  IconInfoCircle,
  IconLink,
  IconWorld,
} from "@tabler/icons-react";
import Link from "next/link";

export function CoinDetailClient({ id }) {
  const coinId = parseInt(id);
  const coinData = getCoinById(coinId);

  if (!coinData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Coin not found</h1>
          <Link
            href="/#market"
            className="inline-flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white bg-violet-950/20 hover:bg-violet-900/30 rounded-lg transition-colors border border-violet-500/20"
          >
            <IconArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-4 xs:p-6 sm:p-8 md:p-10">
        {/* Header with Back Button */}
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={coinData.logo}
                alt={coinData.name}
                className="w-12 h-12 xs:w-16 xs:h-16 md:w-20 md:h-20"
              />
              <span className="absolute -top-2 -right-2 px-2 py-1 bg-violet-900/50 border border-violet-500/20 rounded-md text-[10px] xs:text-xs text-white/70">
                {coinData.rank}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 xs:gap-3">
                <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-white">
                  {coinData.name}
                </h1>
                <span className="text-white/60 text-sm xs:text-md">
                  {coinData.symbol}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 xs:gap-3">
                <span className="text-xl xs:text-2xl md:text-3xl font-bold text-white">
                  ${coinData.currentPrice}
                </span>
                <span
                  className={`flex items-center ${
                    coinData.priceChange >= 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  } text-lg`}
                >
                  {coinData.priceChange >= 0 ? "+" : ""}
                  {coinData.priceChange}%
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/#market"
            className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm xs:text-base text-white/80 hover:text-white bg-violet-950/20 hover:bg-violet-900/30 rounded-lg transition-colors border border-violet-500/20"
          >
            <IconArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
            <span>Back</span>
          </Link>
        </div>

        {/* Quick Links & Contract */}
        <div className="mb-6 md:mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Quick Links Card */}
          <div className="bg-violet-950/20 backdrop-blur-md p-6 xs:p-4 rounded-lg border border-violet-500/20">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-4">
              <h3 className="text-white font-bold text-sm xs:text-base">
                Links & Social
              </h3>
              <span className="text-white/40 text-xs xs:text-sm">
                Official channels
              </span>
            </div>
            <div className="flex flex-wrap gap-2 xs:gap-3">
              {coinData.links &&
                Object.entries(coinData.links).map(([key, url]) => {
                  const icons = {
                    website: IconWorld,
                    twitter: IconBrandTwitter,
                    discord: IconBrandDiscord,
                    telegram: IconBrandTelegram,
                    reddit: IconBrandReddit,
                    github: IconBrandGithub,
                    explorer: IconChartBar,
                    whitepaper: IconBox,
                  };
                  const Icon = icons[key];
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer flex items-center gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                      <Icon className="w-4 h-4 xs:w-5 xs:h-5 text-white/60 group-hover:text-white/90" />
                      <span className="text-sm xs:text-base text-white/80 group-hover:text-white capitalize">
                        {key}
                      </span>
                    </a>
                  );
                })}
            </div>
          </div>

          {/* Contract Info Card */}
          <div className="bg-violet-950/20 backdrop-blur-md p-6 xs:p-4 rounded-lg border border-violet-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold">Smart Contract</h3>
                <IconInfoCircle
                  className="w-4 h-4 text-white/40 cursor-help"
                  title="Verified Contract Address"
                />
              </div>
              <div className="flex items-center gap-2">
                {coinData.links?.explorer && (
                  <a
                    href={`${coinData.links.explorer}/address/${coinData.contract}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white/90 transition-colors"
                  >
                    <IconLink className="w-5 h-5" />
                  </a>
                )}
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(coinData.contract)
                  }
                  className="text-white/60 hover:text-white/90 transition-colors"
                  title="Copy to clipboard"
                >
                  <IconCopy className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-white/60 text-sm font-mono break-all">
              {coinData.contract}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                Verified
              </span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                {coinData.chainName || "Ethereum"}
              </span>
            </div>
          </div>
        </div>

        {/* Tags & Description */}
        <div className="mb-8 bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
          <div className="flex flex-wrap gap-2 mb-4">
            {coinData.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-white/70 leading-relaxed">
            {coinData.description}
          </p>
        </div>

        {/* Trading Info */}
        <div className="mb-6 md:mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Price Pairs */}
          {coinData.priceData && (
            <div className="lg:col-span-2 bg-violet-950/20 backdrop-blur-md p-6 xs:p-4 rounded-lg border border-violet-500/20">
              <h3 className="text-white font-bold mb-4">Markets</h3>
              <div className="overflow-x-auto -mx-3 xs:-mx-4">
                <div className="min-w-[600px] px-3 xs:px-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-white/60 text-sm border-b border-white/10">
                        <th className="text-left py-2">Exchange</th>
                        <th className="text-left py-2">Pair</th>
                        <th className="text-right py-2">Price</th>
                        <th className="text-right py-2">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coinData.priceData?.pricePairs.map((pair, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-white/5 text-white hover:bg-white/5 transition-colors"
                        >
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <img
                                src={pair.logo}
                                alt={pair.exchange}
                                className="w-6 h-6"
                              />
                              <span>{pair.exchange}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="text-white/80">{pair.pair}</span>
                          </td>
                          <td className="text-right py-3">
                            <span className="font-medium">${pair.price}</span>
                          </td>
                          <td className="text-right py-3">
                            <span className="text-white/80">
                              ${pair.volume}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">
                    Showing top {coinData.priceData.pricePairs.length} markets
                  </span>
                  <button className="px-4 py-2 text-sm text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    View All Markets
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Performance Metrics */}
          <div className="bg-violet-950/20 backdrop-blur-md p-6 xs:p-4 rounded-lg border border-violet-500/20">
            <h3 className="text-white font-bold mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {coinData.performance?.periods.map((period) => (
                  <div key={period.name} className="p-2 bg-white/5 rounded-lg">
                    <p className="text-white/60 text-xs mb-1">{period.name}</p>
                    <p
                      className={`text-sm font-medium ${
                        period.value >= 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {period.value >= 0 ? "+" : ""}
                      {period.value}%
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white/60 text-sm mb-2">Compared to:</p>
                {coinData.performance?.compared.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between py-2 border-b border-white/10"
                  >
                    <span className="text-white/80">{item.name}</span>
                    <span
                      className={
                        item.value >= 0 ? "text-emerald-400" : "text-red-400"
                      }
                    >
                      {item.value >= 0 ? "+" : ""}
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 mb-6 md:mb-8">
          <div className="bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
            <p className="text-white/60 text-sm mb-1">Market Cap</p>
            <p className="text-xl font-bold text-white">
              ${coinData.marketCap}
            </p>
            <p
              className={`${
                coinData.marketCapChange >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              } text-sm mt-1`}
            >
              {coinData.marketCapChange >= 0 ? "+" : ""}
              {coinData.marketCapChange}%
            </p>
          </div>
          <div className="bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
            <p className="text-white/60 text-sm mb-1">24h Volume</p>
            <p className="text-xl font-bold text-white">
              ${coinData.volume24h}
            </p>
            <p
              className={`${
                coinData.volumeChange >= 0 ? "text-emerald-400" : "text-red-400"
              } text-sm mt-1`}
            >
              {coinData.volumeChange >= 0 ? "+" : ""}
              {coinData.volumeChange}%
            </p>
          </div>
          <div className="bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
            <p className="text-white/60 text-sm mb-1">FDV</p>
            <p className="text-xl font-bold text-white">${coinData.fdv}</p>
          </div>
          <div className="bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
            <p className="text-white/60 text-sm mb-1">Vol/MCap</p>
            <p className="text-xl font-bold text-white">
              {coinData.volMarketCap}
            </p>
          </div>
        </div>

        {/* Price Chart */}
        <div className="mb-6 md:mb-8">
          <ChartLineInteractive />
        </div>

        {/* Supply Information */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-4 mb-6 md:mb-8">
          <div className="bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
            <div className="flex justify-between items-start mb-2">
              <p className="text-white/70">Circulating Supply</p>
              <span className="text-white/60 text-sm">
                {coinData.circulatingSupply.percent}%
              </span>
            </div>
            <p className="text-xl font-bold text-white">
              {coinData.circulatingSupply.current} {coinData.symbol}
            </p>
            <div className="w-full bg-violet-900/30 rounded-full h-2 mt-2">
              <div
                className="bg-violet-500 h-2 rounded-full"
                style={{
                  width: `${coinData.circulatingSupply.percent}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
            <p className="text-white/70 mb-2">Max Supply</p>
            <p className="text-xl font-bold text-white">
              {coinData.maxSupply} {coinData.symbol}
            </p>
          </div>
          <div className="bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
            <p className="text-white/70 mb-2">Total Supply</p>
            <p className="text-xl font-bold text-white">
              {coinData.totalSupply} {coinData.symbol}
            </p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4">
          {/* Price Statistics */}
          <div className="bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
            <h3 className="text-white font-bold text-lg mb-3">
              Price Statistics
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60">All Time High</span>
                <span className="text-white font-medium">
                  ${coinData.stats?.ath.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">All Time Low</span>
                <span className="text-white font-medium">
                  ${coinData.stats?.atl.price}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">90d High</span>
                <span className="text-white font-medium">
                  ${coinData.stats?.range90d.high}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">90d Low</span>
                <span className="text-white font-medium">
                  ${coinData.stats?.range90d.low}
                </span>
              </div>
            </div>
          </div>

          {/* Market Dominance */}
          <div className="bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
            <h3 className="text-white font-bold text-lg mb-3">
              Market Dominance
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60">Market Share</span>
                <span className="text-white font-medium">
                  {coinData.marketDominance?.share}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Rank</span>
                <span className="text-white font-medium">
                  {coinData.marketDominance?.rank}
                </span>
              </div>
            </div>
          </div>

          {/* ROI */}
          <div className="bg-violet-950/20 backdrop-blur-md p-4 rounded-lg border border-violet-500/20">
            <h3 className="text-white font-bold text-lg mb-3">ROI</h3>
            <div className="space-y-2">
              {Object.entries(coinData.roi || {}).map(([period, value]) => (
                <div key={period} className="flex justify-between">
                  <span className="text-white/60">{period}</span>
                  <span
                    className={value >= 0 ? "text-emerald-400" : "text-red-400"}
                  >
                    {value >= 0 ? "+" : ""}
                    {value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

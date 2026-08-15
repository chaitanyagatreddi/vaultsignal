import Status from "./components/Status";
import { AgGridTable } from "@/components/ui/table";
import { contributorsData } from "@/data/contributors_sample";
import SearchSvg from "@/assets/svgs/search.svg?react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";

function Threats() {
  const defaultColDef = {
    flex: 1,
    cellClass: "pt-[16px] text-sm",
    headerClass:
      "ag-header-cell text-xs font-bold tracking-wider text-gray-500 uppercase",
    resizable: false,
    sortable: true,
  };

  const colDefs = [
    {
      headerName: "CONTRIBUTOR",
      field: "username",
      cellStyle: { paddingLeft: "24px", paddingTop: "16px", paddingBottom: "16px" },
      cellRenderer: (params: { value: string }) => (
        <a
          href={"https://github.com/" + params.value.replace("@", "")}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#166434" }}
          className="hover:underline font-semibold"
        >
          {params.value}
        </a>
      ),
      width: 180,
    },
    {
      headerName: "TIER",
      field: "tier",
      width: 100,
      cellRenderer: (params: { value: string }) => {
        const tier = params.value.toLowerCase();
        let bgColor = "#F3E8FF";
        let textColor = "#6B21A8";
        if (tier === "high" || tier === "critical") {
          bgColor = "#FEF2F2";
          textColor = "#991B1B";
        } else if (tier === "medium") {
          bgColor = "#FFF7ED";
          textColor = "#C2410C";
        }
        return (
          <span
            className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      headerName: "SCORE",
      field: "score",
      width: 120,
      cellRenderer: (params: { value: number }) => (
        <div className="flex flex-col justify-center h-full gap-1 pt-1">
          <span className="font-bold text-gray-800">{params.value}</span>
          <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: params.value + "%" }}
            />
          </div>
        </div>
      ),
    },
    {
      headerName: "EMAIL",
      field: "email",
      width: 220,
      cellRenderer: (params: { value: string }) =>
        params.value === "none" ? (
          <span className="italic" style={{ color: "#01065E" }}>
            {params.value}
          </span>
        ) : (
          <a
            href={"mailto:" + params.value}
            className="hover:underline font-bold"
            style={{ color: "#000000" }}
          >
            {params.value}
          </a>
        ),
    },
    {
      headerName: "SUMMARY",
      field: "summary",
      flex: 2,
      cellClass: "pt-[16px] text-sm text-gray-600 truncate",
    },
    {
      headerName: "REPOS",
      field: "repos",
      flex: 1,
      cellStyle: { paddingTop: "16px" },
      cellRenderer: (params: { value: string }) => (
        <a
          href={"https://github.com/" + params.value}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#166434" }}
          className="hover:underline font-medium"
        >
          {params.value}
        </a>
      ),
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");

  /**
   * Filter rows client-side across all key text fields so the search
   * input actually has an effect on the displayed rows.
   */
  const filteredData = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return contributorsData;
    return contributorsData.filter(
      (c) =>
        c.username.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.repos.toLowerCase().includes(q) ||
        c.tier.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col px-8 pt-6 bg-[#FAFAFA] h-[calc(100vh-64px)] w-full gap-[24px]">
      <Status />
      <div className="w-full h-full flex flex-col gap-[24px] bg-white p-[24px] rounded-lg shadow-sm">
        {/* Search Header */}
        <div className="flex items-center justify-between gap-[8px]">
          <div className="flex items-center gap-[8px] border border-[#D9D9D9] rounded-[4px] w-[300px] py-[8px] px-[12px]">
            <SearchSvg />
            <Input
              type="text"
              placeholder="Search contributors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none focus-visible:ring-0 px-0 h-6"
            />
          </div>
          {searchTerm && (
            <span className="text-xs text-gray-500">
              {filteredData.length} of {contributorsData.length} results
            </span>
          )}
        </div>

        {/* Data Table */}
        <AgGridTable
          defaultColDefs={defaultColDef}
          columnDefs={colDefs}
          rowData={filteredData}
          filterColumn=""
          filterValue=""
        />
      </div>
    </div>
  );
}

export default Threats;

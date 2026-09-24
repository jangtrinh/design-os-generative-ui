import React, { useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";

export const DataTableSchema = z.object({
  title: z.string().describe("Tên bảng dữ liệu"),
  description: z.string().optional().describe("Mô tả bảng"),
  columns: z
    .array(
      z.object({
        key: z.string(),
        label: z.string(),
        align: z.enum(["left", "center", "right"]).default("left"),
      })
    )
    .describe("Danh sách cột"),
  rows: z.array(z.record(z.any())).describe("Dữ liệu các hàng"),
});

export type DataTableProps = z.infer<typeof DataTableSchema>;

export const DataTable: React.FC<DataTableProps> = ({
  title,
  description,
  columns,
  rows,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = rows.filter((row) => {
    if (!searchTerm.trim()) return true;
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
          {description && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{description}</p>
          )}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`pb-2.5 pt-1 px-3 ${
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-6 text-center text-zinc-400">
                  Không tìm thấy bản ghi nào.
                </td>
              </tr>
            ) : (
              filteredRows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  {columns.map((col) => {
                    const val = row[col.key];
                    const isStatus = col.key.toLowerCase().includes("status") || col.key.toLowerCase().includes("trạng thái");
                    
                    return (
                      <td
                        key={col.key}
                        className={`py-3 px-3 text-zinc-800 dark:text-zinc-200 ${
                          col.align === "center"
                            ? "text-center"
                            : col.align === "right"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {isStatus ? (
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              String(val).toLowerCase().includes("success") ||
                              String(val).toLowerCase().includes("thành công") ||
                              String(val).toLowerCase().includes("active")
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                                : String(val).toLowerCase().includes("pending") ||
                                  String(val).toLowerCase().includes("chờ")
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                            }`}
                          >
                            {String(val)}
                          </span>
                        ) : (
                          String(val ?? "")
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

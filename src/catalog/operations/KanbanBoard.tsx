import * as React from "react";
import { z } from "zod";

export const KanbanBoardSchema = z.object({
  title: z.string(),
  columns: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      color: z.enum(["zinc", "emerald", "amber", "red"]),
      tasks: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          priority: z.enum(["low", "medium", "high", "urgent"]),
          assignee: z.string(),
        })
      ),
    })
  ),
});

export type KanbanBoardProps = z.infer<typeof KanbanBoardSchema>;
type Column = KanbanBoardProps["columns"][number];
type Task = Column["tasks"][number];

const columnColors: Record<Column["color"], string> = {
  zinc: "bg-zinc-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  red: "bg-red-400",
};

const priorities: Record<Task["priority"], { label: string; className: string }> = {
  low: {
    label: "Thấp",
    className: "border-zinc-700 bg-zinc-800 text-zinc-300",
  },
  medium: {
    label: "Trung bình",
    className: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  high: {
    label: "Cao",
    className: "border-red-400/30 bg-red-400/10 text-red-300",
  },
  urgent: {
    label: "Khẩn cấp",
    className: "border-red-400 bg-red-950 text-red-200",
  },
};

export const kanbanDefaultProps: KanbanBoardProps = {
  title: "Kế hoạch phát triển sản phẩm Agile",
  columns: [
    {
      id: "todo",
      name: "Cần làm",
      color: "zinc",
      tasks: [
        {
          id: "task-01",
          title: "Tổng hợp phản hồi khách hàng về quy trình đăng ký",
          priority: "medium",
          assignee: "Nguyễn Minh Anh",
        },
        {
          id: "task-02",
          title: "Thiết kế giao diện quản lý thông báo",
          priority: "low",
          assignee: "Trần Hoàng Nam",
        },
      ],
    },
    {
      id: "in-progress",
      name: "Đang xử lý",
      color: "amber",
      tasks: [
        {
          id: "task-03",
          title: "Khắc phục lỗi thanh toán trên thiết bị di động",
          priority: "urgent",
          assignee: "Lê Thu Hà",
        },
      ],
    },
    {
      id: "done",
      name: "Hoàn thành",
      color: "emerald",
      tasks: [
        {
          id: "task-04",
          title: "Hoàn thiện bộ thành phần giao diện dùng chung",
          priority: "high",
          assignee: "Phạm Quang Huy",
        },
      ],
    },
  ],
};

export const kanbanSystem1Criteria =
  "Bảng Kanban kéo thả task, quản lý công việc agile sprint theo cột tiến độ dự án (To Do, In Progress, Done), danh sách thẻ nhiệm vụ công việc.";

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  title = kanbanDefaultProps.title,
  columns = kanbanDefaultProps.columns,
}) => {
  const taskCount = columns.reduce(
    (total, column) => total + column.tasks.length,
    0
  );

  return (
    <section
      aria-label={title || "Bảng công việc"}
      className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-white shadow-xl"
    >
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-100">
            {title}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">Quản lý trực quan luồng công việc theo phương pháp Kanban</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
          {taskCount} công việc
        </span>
      </header>

      {columns.length === 0 ? (
        <p className="rounded-xl border border-dashed border-zinc-800 p-6 text-center text-sm text-zinc-400">
          Chưa có cột công việc.
        </p>
      ) : (
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {columns.map((column) => (
            <section
              key={column.id}
              className="min-w-0 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 shadow-sm"
            >
              <header className="mb-4 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${columnColors[column.color]}`}
                  />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    {column.name}
                  </h3>
                </div>
                <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[11px] font-mono font-medium text-zinc-400">
                  {column.tasks.length}
                </span>
              </header>

              <div className="space-y-2.5">
                {column.tasks.map((task) => {
                  const priority = priorities[task.priority];

                  return (
                    <div
                      key={task.id}
                      className="rounded-lg border border-zinc-800 bg-zinc-900/90 p-3.5 hover:border-zinc-700 transition-colors shadow-sm"
                    >
                      <h4 className="text-xs font-medium text-zinc-200 leading-relaxed">
                        {task.title}
                      </h4>

                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-800/60 text-[11px]">
                        <span
                          className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold border ${priority.className}`}
                        >
                          {priority.label}
                        </span>
                        <span className="text-zinc-400 font-mono text-[10px]">
                          {task.assignee}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
};

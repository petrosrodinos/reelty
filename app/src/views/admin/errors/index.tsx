"use client";

import { useState, type FC } from "react";
import { CircleCheckIcon, WifiOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatePanel } from "@/components/ui/state-panel";
import { useAdminErrors } from "@/features/admin/hooks/use-admin";
import type { ErrorEventStatus } from "@/features/admin/interfaces/admin.interfaces";
import { AdminGuard } from "@/views/admin/components/admin-guard";
import { AdminTabs } from "@/views/admin/components/admin-tabs";
import { ErrorsTable } from "@/views/admin/errors/components/errors-table";

const statusItems = [
  { value: "all", label: "All problems" },
  { value: "failed", label: "Failed" },
  { value: "error", label: "Error (retried)" },
  { value: "warning", label: "Warning" },
];

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ErrorsSkeleton: FC = () => (
  <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading errors">
    {Array.from({ length: 8 }).map((_, index) => (
      <Skeleton key={index} className="h-16 w-full rounded-lg" />
    ))}
  </div>
);

const AdminErrorsContent: FC = () => {
  const [status, setStatus] = useState<ErrorEventStatus | "all">("all");
  const [jobName, setJobName] = useState("all");
  const [projectId, setProjectId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);

  const projectIdValid = UUID_PATTERN.test(projectId.trim());

  const { data, isPending, error, refetch, isFetching } = useAdminErrors({
    page,
    status: status === "all" ? undefined : status,
    job_name: jobName === "all" ? undefined : jobName,
    project_id: projectIdValid ? projectId.trim() : undefined,
    from: fromDate ? new Date(`${fromDate}T00:00:00`).toISOString() : undefined,
    to: toDate ? new Date(new Date(`${toDate}T00:00:00`).getTime() + 86_400_000).toISOString() : undefined,
  });

  const jobItems = [{ value: "all", label: "All jobs" }, ...(data?.job_names ?? []).map((name) => ({ value: name, label: name }))];
  const errors = data?.data ?? [];
  const pagination = data?.pagination;
  const filtered = status !== "all" || jobName !== "all" || projectIdValid || Boolean(fromDate) || Boolean(toDate);
  const clearFilters = () => {
    setStatus("all");
    setJobName("all");
    setProjectId("");
    setFromDate("");
    setToDate("");
    setPage(1);
  };

  return (
    <div className="page-container py-10 md:py-14">
      <div className="mb-8">
        <p className="text-eyebrow text-muted-foreground">Admin</p>
        <h1 className="text-display-lg mt-2">Errors</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every failed, errored or warned step of video generation, listing scrapes and watermark removal, with the
          detailed reason. Users only see a short message; the full detail is here. Paste a project id to narrow the
          list to one video.
        </p>
      </div>

      <AdminTabs />

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value as ErrorEventStatus | "all");
            setPage(1);
          }}
          items={statusItems}
        >
          <SelectTrigger aria-label="Filter by status" className="h-11 w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={jobName}
          onValueChange={(value) => {
            setJobName(value as string);
            setPage(1);
          }}
          items={jobItems}
        >
          <SelectTrigger aria-label="Filter by job" className="h-11 w-full sm:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {jobItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          aria-label="Project id"
          placeholder="Project id"
          className="h-11 w-full font-mono sm:w-80"
          value={projectId}
          onChange={(event) => {
            setProjectId(event.target.value);
            setPage(1);
          }}
        />
        <Input
          type="date"
          aria-label="From date"
          className="h-11 w-full sm:w-40"
          value={fromDate}
          max={toDate || undefined}
          onChange={(event) => {
            setFromDate(event.target.value);
            setPage(1);
          }}
        />
        <Input
          type="date"
          aria-label="To date"
          className="h-11 w-full sm:w-40"
          value={toDate}
          min={fromDate || undefined}
          onChange={(event) => {
            setToDate(event.target.value);
            setPage(1);
          }}
        />
        {filtered ? (
          <Button variant="ghost" onClick={clearFilters}>
            Clear filters
          </Button>
        ) : null}
        {pagination ? (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {pagination.total} {pagination.total === 1 ? "event" : "events"}
          </p>
        ) : null}
      </div>

      {isPending ? (
        <ErrorsSkeleton />
      ) : error ? (
        <StatePanel icon={<WifiOffIcon className="size-6" />} title="We could not load the errors" description={error.message}>
          <Button onClick={() => refetch()} disabled={isFetching}>
            Try again
          </Button>
        </StatePanel>
      ) : errors.length === 0 ? (
        <StatePanel
          icon={<CircleCheckIcon className="size-6" />}
          title={filtered ? "Nothing here" : "No errors recorded"}
          description={filtered ? "No errors match this filter." : "Failed generation steps appear here."}
        >
          {filtered ? (
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : null}
        </StatePanel>
      ) : (
        <div className="flex flex-col gap-8">
          <ErrorsTable errors={errors} />
          {pagination && pagination.total_pages > 1 ? (
            <nav className="flex items-center justify-center gap-4" aria-label="Pagination">
              <Button variant="outline" disabled={!pagination.has_prev || isFetching} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.total_pages}
              </span>
              <Button variant="outline" disabled={!pagination.has_next || isFetching} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </nav>
          ) : null}
        </div>
      )}
    </div>
  );
};

const AdminErrorsPage: FC = () => (
  <AdminGuard>
    <AdminErrorsContent />
  </AdminGuard>
);

export default AdminErrorsPage;

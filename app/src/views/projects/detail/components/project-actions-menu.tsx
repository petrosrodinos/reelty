"use client";

import { useState, type FC } from "react";
import { useRouter } from "next/navigation";
import { CopyIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useDuplicateProject, useRenameProject } from "@/features/projects/hooks/use-projects";
import type { Project } from "@/features/projects/interfaces/projects.interfaces";
import { Routes } from "@/routes/routes";

const TITLE_MAX_LENGTH = 60;

interface ProjectActionsMenuProps {
  project: Project;
  onDelete: () => void;
}

export const ProjectActionsMenu: FC<ProjectActionsMenuProps> = ({ project, onDelete }) => {
  const router = useRouter();
  const duplicate = useDuplicateProject();
  const rename = useRenameProject();
  const [renaming, setRenaming] = useState(false);
  const [title, setTitle] = useState(project.title);

  const trimmed = title.trim();
  const canSave = trimmed.length > 0 && trimmed !== project.title && !rename.isPending;

  const openRename = () => {
    setTitle(project.title);
    setRenaming(true);
  };

  const submitRename = () => {
    if (!canSave) return;
    rename.mutate({ id: project.id, title: trimmed }, { onSuccess: () => setRenaming(false) });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          {duplicate.isPending ? <Spinner /> : <MoreHorizontalIcon />}
          Actions
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem onClick={openRename} className="py-2">
            <PencilIcon /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={duplicate.isPending}
            onClick={() => duplicate.mutate(project.id, { onSuccess: (copy) => router.push(Routes.edit(copy.id)) })}
            className="py-2"
          >
            <CopyIcon /> Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={onDelete} className="py-2">
            <Trash2Icon /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={renaming} onOpenChange={(open) => !open && !rename.isPending && setRenaming(false)}>
        <DialogContent className="sm:max-w-md">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitRename();
            }}
            className="grid gap-4"
          >
            <DialogHeader>
              <DialogTitle>Rename project</DialogTitle>
              <DialogDescription>
                Only the name in your library changes. The title shown inside the finished video stays as it is, and
                the video is not re-created.
              </DialogDescription>
            </DialogHeader>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={TITLE_MAX_LENGTH}
              aria-label="Project title"
              autoFocus
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRenaming(false)} disabled={rename.isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={!canSave}>
                {rename.isPending ? <Spinner /> : null}
                Save name
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

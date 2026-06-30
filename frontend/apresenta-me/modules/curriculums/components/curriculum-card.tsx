import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Curriculum } from "../types/curriculum.types";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatUpdatedAt } from "../utils";

export function CurriculumCard({
  curriculum,
  onDelete,
  isDeleting,
}: {
  curriculum: Curriculum;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>{curriculum.headline || curriculum.full_name}</CardTitle>
        <CardDescription>{curriculum.slug}</CardDescription>

        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Excluir currículo"
            disabled={isDeleting}
            onClick={() => onDelete(curriculum.id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Atualizado {formatUpdatedAt(curriculum.updatedAt)}
        </p>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/curriculums/${curriculum.id}`}>
              <Edit className="size-4" />
              Editar
            </Link>
          </Button>

          <Button asChild variant="ghost" size="sm">
            <Link
              href={`/dashboard/curriculums/${curriculum.id}?tab=Preview%20ATS`}
            >
              <Eye className="size-4" />
              Visualizar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

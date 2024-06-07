import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentModel } from "@/types/AppointmentModel";
import { Badge } from "@/components/ui/badge";
import { stripHtml } from "@/lib/utils";

export function AppointmentListItem({
  id,
  title,
  headCount,
  location,
}: {
  headCount: number;
} & Pick<AppointmentModel, "id" | "title" | "location">) {
  return (
    <Link to={`/appointments/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title}

            {headCount > 1 && <Badge variant="outline">{headCount}명</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>{stripHtml(location?.title ?? "")}</CardContent>
      </Card>
    </Link>
  );
}

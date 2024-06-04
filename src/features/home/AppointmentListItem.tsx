import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentModel } from "@/types/AppointmentModel";
import { Badge } from "@/components/ui/badge";

export function AppointmentListItem({
  id,
  title,
  headCount,
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
      </Card>
    </Link>
  );
}

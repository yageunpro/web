import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentModel } from "@/types/AppointmentModel";
import { Badge } from "@/components/ui/badge";

export function AppointmentListItem({
  id,
  title,
  participantList,
}: Pick<AppointmentModel, "id" | "title" | "participantList" | "location">) {
  return (
    <Link to={`/appointments/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title}

            {participantList.length > 0 && (
              <Badge variant="outline">{participantList.length}명</Badge>
            )}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

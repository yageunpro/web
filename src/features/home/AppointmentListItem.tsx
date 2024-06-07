import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentModel } from "@/types/AppointmentModel";
import { Badge } from "@/components/ui/badge";
import { prettyDate, stripHtml } from "@/lib/utils";

export function AppointmentListItem({
  id,
  title,
  headCount,
  confirmTime,
  location,
}: {
  headCount: number;
} & Pick<AppointmentModel, "id" | "title" | "location" | "confirmTime">) {
  return (
    <Link to={`/appointments/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title}

            {headCount > 1 && (
              <Badge
                className="py-0.5 px-2 font-normal text-xs"
                variant="outline"
              >
                {headCount}명
              </Badge>
            )}
          </CardTitle>
        </CardHeader>

        {(location?.title || confirmTime) && (
          <CardContent className="flex flex-col gap-1">
            {stripHtml(location?.title ?? "")}
            {confirmTime && <p>{prettyDate(new Date(confirmTime))}</p>}
          </CardContent>
        )}
      </Card>
    </Link>
  );
}

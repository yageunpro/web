import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LocationModel } from "@/types/LocationModel";

const BottomButtonSize = 72;

export function LocationListView({
  locationList,
  selectedLocationId,
  onClickLocation,
}: {
  locationList?: LocationModel[];
  selectedLocationId: string;
  onClickLocation: (locationId: string) => void;
}) {
  if (!locationList) return null;
  if (!locationList.length) return null;

  return (
    <div className="w-full absolute" style={{ bottom: BottomButtonSize }}>
      {locationList && (
        <ButtonGroup value={selectedLocationId}>
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-4 p-4">
              {locationList.map((location) => (
                <ButtonGroupItem
                  value={location.id}
                  key={location.id}
                  checked={selectedLocationId === location.id}
                  className="border bg-background data-[state=checked]:border-slate-950 w-[156px] rounded-md focus:outline-none 2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shrink-0 overflow-hidden px-2 h-[82px] text-left"
                  onClick={() => onClickLocation(location.id)}
                >
                  <div className="flex flex-col gap-[2px] w-full overflow-hidden ">
                    <div
                      dangerouslySetInnerHTML={{ __html: location.title }}
                      className="w-full overflow-hidden text-sm text-ellipsis"
                    />
                    <p className="w-full whitespace-normal break-before-auto text-xs">
                      {location.address}
                    </p>
                  </div>
                </ButtonGroupItem>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </ButtonGroup>
      )}
    </div>
  );
}

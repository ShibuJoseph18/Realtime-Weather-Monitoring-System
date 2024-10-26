import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export const CitySelector = ({ cities, onCityChange, selectedCity }) => {
  return (
    <div className="h-full bg-background border-r shadow-md p-4">
      <h2 className="text-3xl font-bold mb-6 text-primary">Cities</h2>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="pr-4 space-y-4">
          {cities.map((city) => (
            <Button
              key={city}
              variant="outline"
              className={`w-full justify-start text-left p-4 text-lg font-medium rounded-md transition-all ${
                selectedCity === city 
                  ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                  : 'hover:bg-secondary hover:scale-102'
              }`}
              onClick={() => onCityChange(city)}
            >
              {city}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

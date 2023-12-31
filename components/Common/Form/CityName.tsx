import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useGoogleMapsScript } from "use-google-maps-script";
import styled from "styled-components";
import { useEffect } from "react";

interface Props {
  onSelectCity: (city: string) => void;
  defaultValue: string;
}

type Library =
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization";

const libraries: Library[] = ["places"];
const googleMapsApiKey: string = process.env
  .NEXT_PUBLIC_GOOGLE_API_KEY as string;

export function CityName({ onSelectCity, defaultValue }: Props) {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey,
    libraries,
  });
  if (!isLoaded) return null;
  if (loadError) return <div>Error loading</div>;

  return (
    <CitySearchBox
      onSelectCity={onSelectCity}
      defaultValue={defaultValue}
    ></CitySearchBox>
  );
}

function CitySearchBox({ onSelectCity, defaultValue }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { types: ["(cities)"] },
    debounce: 300,
    defaultValue,
  });

  useEffect(() => {
    setValue(defaultValue || "", false);
  }, [defaultValue, setValue]);

  const handleSelect = (city) => {
    setValue(city, false);
    clearSuggestions();
    onSelectCity({ label: city });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <StyledCombobox onSelect={handleSelect}>
      <StyledComboboxInput
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder="Search the city"
      />
      <StyledComboboxPopover>
        {status === "OK" && (
          <StyledComboboxList>
            {data.map(({ place_id, description }) => (
              <StyledComboboxOption key={place_id} value={description} />
            ))}
          </StyledComboboxList>
        )}
      </StyledComboboxPopover>
    </StyledCombobox>
  );
}

const StyledCombobox = styled(Combobox)``;

const StyledComboboxInput = styled(ComboboxInput)`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledComboboxPopover = styled(ComboboxPopover)``;

const StyledComboboxList = styled(ComboboxList)`
  margin: 10px;
  padding: 0;
`;

const StyledComboboxOption = styled(ComboboxOption)`
  padding: 15px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

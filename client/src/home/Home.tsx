import {type TActivityRankingResponse} from "@diaazzawi/collinson-server";
import {Treaty} from "@elysiajs/eden";
import {Autocomplete, AutocompleteRenderInputParams, Box} from "@mui/material";
import {useDebounce} from "@uidotdev/usehooks";
import {FC, useCallback, useEffect, useState} from "react";
import {elysiaClient, httpClient} from "../ApiClients";
import {
  Container,
  MainContainer,
  Subtitle,
  TextField,
  Title,
} from "./Home.styles";
import DaysList from "./components/DaysList";

type TGeoCity = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

const Home: FC = () => {
  const [address, setAddress] = useState<string>("");
  const [cities, setCities] = useState<TGeoCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<TGeoCity | null>(null);
  const [rankedActivities, setRankedActivities] = useState<
    TActivityRankingResponse[]
  >([]);
  // Use debounce to wait for the user to stop typing, thus reducing the number of API calls
  const debouncedAddress = useDebounce(address, 300);

  useEffect(() => {
    const getWorldCities = async (addr: string) => {
      if (addr) {
        try {
          const resp = await httpClient.get(
            `https://geocode.maps.co/search?q=${addr}&api_key=${import.meta.env.VITE_MAPS_API_KEY}`,
          );
          const data = resp.data as TGeoCity[];
          setCities(data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setCities([]);
      }
    };

    getWorldCities(debouncedAddress);
  }, [debouncedAddress]);

  useEffect(() => {
    const getRankedActivities = async (city: TGeoCity) => {
      if (selectedCity) {
        const resp: Treaty.TreatyResponse<Record<number, unknown>> =
          await elysiaClient.api
            .activities({lat: city.lat})({lng: city.lon})
            .get();
        if (resp.data) {
          const elysiaResp = resp.data as TActivityRankingResponse[];
          setRankedActivities(elysiaResp);
        }
      }
    };

    if (selectedCity) {
      getRankedActivities(selectedCity);
    } else {
      setRankedActivities([]);
    }
  }, [selectedCity]);

  const handleCityInputChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setAddress(value);
    },
    [],
  );

  const handleCityOptionChanged = useCallback((_: any, newValue: TGeoCity) => {
    setSelectedCity(newValue);
  }, []);

  return (
    <Container>
      <Title variant="h1" gutterBottom>
        Activities Ranking System
      </Title>
      <Subtitle variant="h2" gutterBottom>
        By Dia Azzawi
      </Subtitle>
      <Subtitle variant="h3" gutterBottom>
        A Solution for the Techanical Assessment for the "Client Solutions
        Architect" position at Collinson Group.
      </Subtitle>
      <MainContainer>
        <Autocomplete
          options={cities}
          sx={{width: 500}}
          autoHighlight
          // getOptionLabel={(option: TGeoCity) => option.display_name}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              label="City"
              onChange={handleCityInputChanged}
            />
          )}
          getOptionLabel={(option: TGeoCity) => option.display_name}
          renderOption={(props, option: TGeoCity) => {
            const {key, ...optionProps} = props;
            return (
              <Box key={key} component="li" {...optionProps}>
                {option.display_name} ({option.lat}):{option.lon}
              </Box>
            );
          }}
          onChange={handleCityOptionChanged}
        />
        <DaysList activities={rankedActivities} />
      </MainContainer>
    </Container>
  );
};

export default Home;

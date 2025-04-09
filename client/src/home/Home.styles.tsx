import {
  Autocomplete as MuiAutocomplete,
  TextField as MuiTextField,
  Typography as MuiTypography,
} from "@mui/material";
import styled from "styled-components";
import tw from "tailwind-styled-components";

export const Container = tw.main`
    flex
    flex-col
    justify-center
    items-center
    mt-10
`;

const StyledTypography = styled(MuiTypography)``;

export const Title = tw(StyledTypography)`
    font-medium!
    text-center
    mx-10!
    text-red-700
`;

export const Subtitle = tw(StyledTypography)`
    text-center
    mx-6!
`;

export const MainContainer = tw.div`
    flex
    flex-col
    justify-center
    items-center
    gap-2
    mt-20
`;

const StyledAutocomplete = styled(MuiAutocomplete)``;

export const Autocomplete = tw(StyledAutocomplete)`
    text-center
    mx-6!
`;

const StyledTextField = styled(MuiTextField)``;

export const TextField = tw(StyledTextField)`
    p-3
    w-full
    bg-transparent
    outline-slate-500
    [&_div]:rounded-xl
`;

import tw from "tailwind-styled-components";

export const Header = tw.header`
    px-3
    sm:px-4
    py-4
    mx-auto
    max-w-3xl
`;

export const Title = tw.h1`
    text-2xl
    sm:text-3xl
    text-center
    underline
    underline-offset-8
    decoration-wavy
    pb-4
`;

export const Main = tw.main`
    flex
    flex-col
    gap-3
    mx-auto
    max-w-3xl
    px-3
    sm:px-4
`;

export const Subtitle = tw.h2`
    text-xl
`;

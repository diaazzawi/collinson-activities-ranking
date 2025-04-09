import tw from "tailwind-styled-components";

export const Section = tw.section`
    flex
    flex-col
    gap-2
    rounded-l
    border-slate-400/40
    border-2
    w-full
    p-2
    mb-10
`;

export const GroupTitle = tw.h3`
    text-slate-600
    text-lg
    font-medium
`;

export const List = tw.ul`
   flex
   flex-col
`;

export const Paragraph = tw.p`
    text-slate-500
    text-center
    rounded-xl
    border-slate-400/40
    border-2
    p-3
`;

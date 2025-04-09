import tw from "tailwind-styled-components";

export const DayItem = tw.li`
    grid
    grid-cols-[auto_1fr_auto]
    items-center
    gap-3
    p-2
`;

export const DayContainer = tw.div`
    text-slate-600
    font-medium
    text-md
    truncate
`;

export const Date = tw.span`
    text-red-600
    font-bold
    text-md
    truncate
`;

export const ActivityItem = tw.li`
    grid
    grid-cols-[auto_1fr_auto]
    items-center
    px-2
    py-0
`;

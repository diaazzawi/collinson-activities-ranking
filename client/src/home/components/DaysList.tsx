import {TActivityRankingResponse} from "@diaazzawi/collinson-server";
import {FC} from "react";
import Day from "./Day";
import {GroupTitle, List, Paragraph, Section} from "./DaysList.styles";

type TDaysListProps = {
  activities: TActivityRankingResponse[];
};

const DaysList: FC<TDaysListProps> = ({activities}) => {
  if (activities.length > 0) {
    return (
      <Section>
        <GroupTitle>Ranked activities for the next 7 days:</GroupTitle>
        <List>
          {activities.map((activity) => (
            <Day key={activity.date} activity={activity} />
          ))}
        </List>
      </Section>
    );
  } else {
    return <Paragraph>No activities to show!</Paragraph>;
  }
};

export default DaysList;

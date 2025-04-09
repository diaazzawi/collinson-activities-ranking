import {type TActivityRankingResponse} from "@diaazzawi/collinson-server";
import {DateTime} from "luxon";
import React from "react";
import {ActivityItem, Date, DayContainer, DayItem} from "./Day.styles";
import {List} from "./DaysList.styles";

type TProps = {
  activity: TActivityRankingResponse;
};

const Day: React.FC<TProps> = (props) => {
  const {activity} = props;

  const formatDateTime = (dateString: string, format: string): string => {
    const dateTime = DateTime.fromISO(dateString);
    return dateTime.toFormat(format);
  };

  return (
    <DayItem>
      <DayContainer>
        <Date>{`${formatDateTime(activity.date, "MMMM dd, yyyy")}:`}</Date>
        <List>
          {Object.entries(activity.ranking).map(([key, value]) => (
            <ActivityItem key={key}>
              {key}: {value}
            </ActivityItem>
          ))}
        </List>
      </DayContainer>
    </DayItem>
  );
};

export default Day;

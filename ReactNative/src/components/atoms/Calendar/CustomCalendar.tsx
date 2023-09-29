import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import themes from '@/themes';
import {IDay, useDate} from './useDate';
import moment from 'moment';
import AntIcon from 'react-native-vector-icons/AntDesign';

export const weekdayLabels = [
  {
    label: '일',
    isWeekend: true,
  },
  {
    label: '월',
  },
  {
    label: '화',
  },
  {
    label: '수',
  },
  {
    label: '목',
  },
  {
    label: '금',
  },
  {
    label: '토',
  },
];

interface IProps {
  listDateChecked: string[];
}

const CustomCalendar: React.FC<IProps> = ({listDateChecked}) => {
  const {days, year, month} = useDate(listDateChecked, 0);

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{`${year}년 ${month}월`}</Text>
      </View>
      <View style={[styles.weekContainer]}>
        <FlatList
          data={weekdayLabels}
          renderItem={({item}) => (
            <View style={styles.weekLabelWrapper}>
              <Text
                style={[
                  styles.weekLabel,
                  item.isWeekend && styles.weekendLabel,
                ]}>
                {item.label}
              </Text>
            </View>
          )}
          numColumns={7}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View>
        <FlatList
          data={days}
          renderItem={({item}) => <CalendarCell date={item} />}
          numColumns={7}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={CalendarCell.ItemSeparatorComponent}
        />
      </View>
    </View>
  );
};

const CalendarCell = ({date}: {date: IDay}) => {
  const isDateNonCheck =
    !date.event &&
    !date.isDisabled &&
    !date.isCurrentDay &&
    moment(new Date()).isAfter(date.date, 'D');

  const handlePress = () => {
    console.log({date});
  };

  return (
    <TouchableOpacity
      style={styles.dayContainer}
      onPress={handlePress}
      disabled={!date.isCurrentDay}>
      <View
        style={[
          styles.dayWrapper,
          date.isCurrentDay && styles.currentDay,
          !!date.event && styles.dayChecked,
        ]}>
        <Text
          style={[
            date.isDisabled ? styles.dayDisabled : styles.dayText,
            date.isCurrentDay && styles.currentDay,
            !!date.event && styles.dayCheckedText,
          ]}>
          {date?.value}
        </Text>
        {isDateNonCheck && (
          <AntIcon
            name="close"
            size={20}
            style={{position: 'absolute'}}
            color={themes.color.gray[700]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

CalendarCell.ItemSeparatorComponent = () => (
  <View style={{height: themes.spacing[1.5]}} />
);

const styles = StyleSheet.create({
  calendarContainer: {
    paddingHorizontal: themes.spacing[7],
    paddingVertical: themes.spacing[4],
    backgroundColor: themes.color.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    borderRadius: themes.spacing[1],
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: themes.spacing[3],
  },
  headerText: {
    fontSize: themes.fontSizes.md,
    lineHeight: themes.spacing[6],
    fontWeight: '500',
    color: themes.color.gray[606],
  },
  weekContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E4E7ED',
    marginBottom: 12,
  },
  weekLabelWrapper: {
    flex: 1,
    height: themes.spacing[10.5],
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekLabel: {
    color: themes.color.gray[606],
    flexDirection: 'row',
    justifyContent: 'center',
  },
  weekendLabel: {
    color: themes.color.red[900],
  },
  dayContainer: {
    flex: 1,
    width: themes.spacing[10.5],
    height: themes.spacing[7.5],
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayWrapper: {
    width: themes.spacing[6.5],
    height: themes.spacing[6.5],
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: themes.fontSizes.xs,
    color: themes.color.gray[606],
  },
  currentDay: {
    backgroundColor: themes.color.red[900],
    borderRadius: themes.spacing[1],
    color: themes.color.white,
  },
  dayChecked: {
    borderRadius: themes.spacing[10],
    borderWidth: 2,
    borderColor: themes.color.red[900],
  },
  dayCheckedText: {
    color: themes.color.red[900],
  },
  dayDisabled: {
    fontSize: themes.fontSizes.xs,
    color: '#C0C4CC',
  },
});

export default CustomCalendar;

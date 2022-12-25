import React, { useCallback, useMemo, useState } from 'react';
import { Pressable } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Box, Input } from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const today = new Date();

export const DateInput = ({
  field,
  onChange,
  disabled = false,
  testID,
}: {
  field: { onBlur?: () => void; value: string | number | Date };
  onChange: (date: number) => void;
  disabled?: boolean;
  testID?: string;
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    field.value ? new Date(field.value) : new Date(),
  );

  const inputValue = useMemo(
    () => dayjs(field.value ? field.value : new Date()).format('DD-MM-YYYY'),
    [field.value],
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = useCallback(
    (date: Date) => {
      hideDatePicker();
      setSelectedDate(date);
      onChange(date.getTime());
    },
    [onChange],
  );
  return (
    <>
      <Pressable onPress={showDatePicker} disabled={disabled}>
        <Input
          testID={testID}
          value={inputValue}
          onBlur={field.onBlur}
          isReadOnly
          onPressOut={disabled ? undefined : showDatePicker}
          InputRightElement={
            <Box mr="4">
              <FontAwesome name="calendar" />
            </Box>
          }
        />
      </Pressable>
      <DateTimePickerModal
        date={selectedDate}
        isVisible={isDatePickerVisible}
        mode="date"
        maximumDate={today}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

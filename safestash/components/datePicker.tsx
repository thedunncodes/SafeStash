import React, { useState } from 'react';
import { View, Text, type ViewProps, Platform, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Colors from '@/constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppState } from '@/components/appStates/onboardingFormStates';


interface DatePickerProps extends ViewProps{
  defaultDate?: Date;
}

const DatePicker = ({ defaultDate, style }: DatePickerProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { date, setDate, setDateField } = useAppState()

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDateField(formatDate(currentDate))
  };


  const showDatePicker = () => {
    setShow(true);
    Platform.OS === 'ios'? setModalVisible(true) : setModalVisible(false) 
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.label} onPress={showDatePicker} >
        <Icon name='calendar' size={25} color={Colors.light.text} />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent={true}
        onTouchCancel={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={ () => {
            setModalVisible(false)
        } } >
            <View style={{ flex: 1, backgroundColor: 'rgba(27, 27, 27, .3)' }} ></View>
        </TouchableWithoutFeedback>
        <View style={ styles.modalContainer } >
            <View style={ styles.modalView } >
                <TouchableWithoutFeedback onPress={ () => {
                    setModalVisible(false)
                } } >
                    <View style={{ borderBottomWidth: 2, borderBottomColor : 'rgba(200, 200, 200, .2)', }} >
                      <Text style={styles.doneBtn} >Done</Text>
                    </View>
                </TouchableWithoutFeedback>
                {Platform.OS === 'ios' && show && (
                    <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                    textColor={Colors.light.text}
                    />
                )}
            </View>
        </View>
      </Modal>
      {/* Android Date picker below */}
      {Platform.OS === 'android' && show && (
            <DateTimePicker
            value={date}
            mode="date"
            display={'default'}
            onChange={onChange}
            />
        )} 
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'transparent',
    
  },
  modalView: {
    backgroundColor: Colors.light.background,
    borderTopWidth: 2,
    borderColor: 'rgba(200, 200, 200, .2)'
  },
  label: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  doneBtn: {
    fontSize: 20,
    color: '#0084ff',
    padding: 5,
    paddingRight: 15,
    textAlign: 'right',
    width: '100%',
  },
});

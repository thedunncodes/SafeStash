import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, FlatList, Platform, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, type ViewProps } from 'react-native';
import { countries } from 'country-data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { useAppState } from '@/components/appStates/onboardingFormStates';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CountryPickerProps extends ViewProps {
  defaultValue?: string;
  showModal: boolean;
}

interface CountryItem {
    label: string,
    value: string
}

const CountryPicker = ({ defaultValue, showModal, style }: CountryPickerProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(showModal);
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const { setCountry } = useAppState()

  const countryOptions: CountryItem[] = useMemo(() => {
    return countries.all
      .filter((country) => country.countryCallingCodes.length > 0)
      .map((country) => ({
        label: `${country.emoji}   ${country.name}`,
        value: country.name,
      }))
      .filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery]);

  const renderItem = ({item}: {item: CountryItem}) => (
    <TouchableOpacity style={ itemStyles.itemView } onPress={() => {
        setCountry(item.value)
        setModalVisible(false)
        setToggleModal(false);
    }} >
      <Text style={ itemStyles.itemBtn } >{item.label}</Text>
    </TouchableOpacity>
  );

  const toggleChevron = () => {
    if (toggleModal) {
        setToggleModal(false);
    } else {
        setToggleModal(true);
        setModalVisible(true)
    }
}

  const insets = useSafeAreaInsets();

  return (
        <View style={style} >
            <TouchableOpacity onPress={toggleChevron} style={ styles.countryPickerBtn } >
               <Icon name='chevron-down' size={22} color={Colors.light.text} style={{ display: toggleModal? 'none' : 'flex' }} />
               <Icon name='chevron-up' size={22} color={Colors.light.text} style={{ display: toggleModal? 'flex' : 'none' }} />
            </TouchableOpacity>
            <Modal 
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
                statusBarTranslucent={true}
            >
                <KeyboardAvoidingView 
                    behavior='position'
                    contentContainerStyle={{ flex: 1 }}
                    style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalVisible(false)
                        setToggleModal(false);
                    }} >
                        <View style={{ flex: 2 }} />
                    </TouchableWithoutFeedback>
                    <View style={[ styles.modalView, Platform.OS === 'ios'? { paddingBottom: insets.bottom } : { paddingBottom: 10 }, ]}>
                            <TextInput
                            style={styles.searchInput}
                            placeholder="Search for a country..."
                            placeholderTextColor={Colors.light.text}
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                        <FlatList 
                            data={countryOptions}
                            keyExtractor={(item: CountryItem, index: number) => `${item.label}-${index}`}
                            renderItem={renderItem}
                        />
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(27, 27, 27, .3)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    flex: 1,
    padding: 5,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  searchInput: {
    marginBottom: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: Colors.light.background,
    backgroundColor: Colors.light.tBg,
    color: Colors.light.text,
    borderRadius: 17,
    fontSize: 16,
    fontFamily: 'Poppins-Medium'

  },
  countryPickerBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

const itemStyles = StyleSheet.create({
  itemView: {
    marginTop: 7,
  },
  itemBtn: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1.4,
    borderRadius: Platform.OS === 'ios'? 13 : 10 ,
    borderColor: Colors.light.background,
    backgroundColor: Colors.light.tBg,
    color: Colors.light.text,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    overflow: 'hidden'
  },
});

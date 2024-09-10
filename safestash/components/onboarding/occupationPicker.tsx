import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Modal, FlatList, Platform, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, type ViewProps } from 'react-native';
import occupations from '@/constants/Occupations';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { useAppState } from '@/components/appStates/onboardingFormStates';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formValidation } from '@/components/appStates/onboardingFormStates';

interface OccupationPickerProps extends ViewProps {
  defaultValue?: string;
  showModal: boolean;
}

interface JobItem {
    label: string,
    value: string
}

const OccupationPicker = ({ defaultValue, showModal, style }: OccupationPickerProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(showModal);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [newJobHolder, setNewJobHolder] = useState<string>('');
  const [newJob, setNewJob] = useState<string>('');
  const { setOccupation, errors, setErrors } = useAppState()


  const ValidateForm = () => {
        let errors: formValidation = {}

        if (newJobHolder === '') errors.newJob = 'Empty Occupation Entry Not Valid'
        setErrors(errors)

        return Object.keys(errors).length === 0
    }

    const handleNewJob = () => {
        if (ValidateForm()) {
            setNewJob(newJobHolder)
        }
    }


  
  const jobTitles: JobItem[] = useMemo(() => {
    let tempJob = occupations;
    if (newJob !== '') {
        tempJob.push(newJob)
        setNewJob('')
    }

    return tempJob
      .map((job) => ({
        label: `${job}`,
        value: job,
      }))
      .filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, newJob]);

  const renderItem = ({item}: {item: JobItem}) => (
    <TouchableOpacity style={ itemStyles.itemView } onPress={() => {
        setOccupation(item.value)
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
            <TouchableOpacity onPress={toggleChevron} style={ styles.occupationPickerBtn } >
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
                            placeholder="Search for your Occupation..."
                            placeholderTextColor={Colors.light.text}
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                        {
                            jobTitles.length <= 0
                            ? <View>
                                <View style={styles.newJobInfoView} >
                                    <Text style={ styles.newJobInfoText } >Oops, Occupation Not Found</Text>
                                </View>
                                <TextInput
                                    style={[styles.searchInput, styles.newJobInput ]}
                                    placeholder="Enter your occupation"
                                    placeholderTextColor='rgba(27, 27, 27, .5)'
                                    onChangeText={(text) => {
                                        setNewJobHolder(text)
                                        errors.newJob? errors.newJob = undefined : undefined;
                                    }}
                                />
                                {
                                    errors.newJob ? <View style={ styles.errorView } ><Text style={ styles.errorText } >{errors.newJob}</Text></View> : null
                                }
                                <TouchableOpacity onPress={handleNewJob} style={styles.newJobSubmitView} >
                                    <Text style={styles.newJobSubmitText} >Add Yours</Text>
                                </TouchableOpacity>
                            </View> 
                            : null
                        }

                        <FlatList 
                            data={jobTitles}
                            keyExtractor={(item: JobItem, index: number) => `${item.label}-${index}`}
                            renderItem={renderItem}
                        />
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
  );
};

export default OccupationPicker;

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
  occupationPickerBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  newJobContainer: {},
  newJobInfoView: {
    alignItems: 'center',
    width: '100%',
    marginTop: 6
  },
  newJobInfoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  newJobInput: {
    backgroundColor: 'white',
    borderRadius: 5
  },
  newJobSubmitView: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: Colors.light.background,
    marginTop: 5,

  },
  newJobSubmitText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    padding: 10,
    fontFamily: 'Poppins-SemiBold'
    
  },
  errorView: {
    borderBottomWidth: .5,
    borderBottomColor: Colors.light.red,
    height: 'auto',
    marginBottom: 5,
    marginTop: 5,
    },
    errorText: {
        fontSize: 12,
        padding: 1,
        textAlign: 'center'
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

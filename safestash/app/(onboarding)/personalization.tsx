import { router } from "expo-router";
import { useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet, Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import BackBtn from "@/components/backBtn";
import Header from "@/components/onboarding/header";
import BodyView from "@/components/bodyView";
import tags from "@/constants/tags";
import Colors from "@/constants/Colors";
import { useAppState } from "@/components/appStates/onboardingFormStates";

interface TagItem {
    id: number;
    tag: string;
}

export default function Personalize() {
    const [tagHolder, setTagHolder] = useState<string>('')
    const [tagList, setTagList] = useState<string[]>(tags)
    const [ originalTagLength, setOriginalTagLength ] = useState<number>(tags.length)

    const handleTag = () => {
        if (tagHolder !== '') {
            setTagList((prevTags) => [...prevTags, tagHolder]);
            setTagHolder('');
        }
    };

    const handleRemove = (index: number) => {
        const updatedTagList = tagList.filter((_, i) => i !== index);
        setTagList(updatedTagList);
    };

    const handleSubmit = () => {
        // Check for form validation
        // return the splice to the backend
        console.log(tagList.slice(originalTagLength))
        router.navigate('/password')
    }

    return(
        <BodyView  >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <KeyboardAvoidingView
            
                    style={ styles.body }
                                
                >
                    <BackBtn pathname="/userData" style={ styles.backBtn } />
                    <Header style={styles.header} >Personalization</Header>
                    <View style={ styles.container } >
                        <View style={ styles.infoSectionView } >
                            <Text style={ styles.infoSectionText } >
                                We have provided some tags to help you monitor and
                                improve your spending habits, you can choose to add more now or later on.
                                e.g Vets, Restaurants, PetFood, Spotify, Groceries
                            </Text>
                        </View>
                
                        <ScrollView
                            style={ styles.tagView }
                            nestedScrollEnabled={true}
                            contentContainerStyle={{flexDirection: 'row' ,flexWrap:'wrap', maxWidth: '100%'}}
                        >
                        {
                            tagList.map((item, index) => {
                                return(
                                    <View key={index} style={ styles.tagBody } >
                                        <View style={ styles.tagContainer } >
                                            <Text style={styles.tagContainerText} >{item}</Text>
                                            <TouchableWithoutFeedback onPress={() => handleRemove(index)} >
                                                <View style={[ {display: index >= originalTagLength ? 'flex' : "none"}, styles.tagIconView ]} >
                                                    <Icon name="times" style={styles.tagIcon} />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        </ScrollView>
                        <TextInput
                            style={ styles.tagInput }
                            placeholder="Add a new tag"
                            placeholderTextColor='rgba(27, 27, 27, .7)'
                            value={tagHolder}
                            maxLength={20}
                            onChangeText={(text) => setTagHolder(text)}
                        />
                        <TouchableOpacity onPress={handleTag} style={styles.tagSubmitView} >
                            <Text style={styles.tagSubmitText} >Add Yours</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.submitContainer } >
                        <TouchableOpacity onPress={handleSubmit} style={styles.submitView} >
                            <Text style={styles.submitViewText} >
                                Save Tags
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </BodyView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 5,
    },
    container: {
        padding: 5,
            },
    header: {
        fontSize: 29,
        padding: 5,
    },
    backBtn: {
        marginBottom: 15,
    },
    infoSectionView: {
        marginTop: 5,
        marginBottom: 20,
    },
    infoSectionText: {
        fontFamily: 'PoppinsMedium',
        fontSize: 13,
        lineHeight: 20,
    },
    tagInput: {
        marginBottom: 5,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderWidth: 2,
        borderColor: 'rgba(77, 195, 255, 0.4)',
        backgroundColor: '#fff',
        color: Colors.light.text,
        borderRadius: 5,
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    
      },
    tagSubmitView: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: 'rgba(77, 195, 255, 0.2)',
        marginTop: 15,
    
      },
      tagSubmitText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 15,
        padding: 10,
        fontFamily: 'Poppins-SemiBold'
        
      },
      tagBody: { 
        width: '24%',
        marginLeft: 3,
        marginBottom: 4,
    },
    tagContainer: {
        justifyContent: 'center',
        backgroundColor: 'rgba(77, 195, 255, 0.2))',
        width: '100%',
        borderRadius: 10,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 3,
        paddingRight: 0,
        flexDirection: 'row',
      },
      tagView: { 
        height: 130,
        marginTop: 10,
        flexGrow: 0,
      },
      tagContainerText: {
        fontSize: 11,
        fontFamily: 'Poppins-Medium',
        flexShrink: 1,
        textAlign:'center',
        minWidth: '50%',
        flexWrap: 'wrap'
      },
      tagIconView: {
        maxWidth: '24.7%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagIcon: {
        color: Colors.light.red,
    },
    submitContainer: {
        alignItems: 'center',
        marginTop: 130,
    },
    submitView: {
        width: '92%',
        backgroundColor: Colors.light.darkRed,
        borderRadius: 15,
        height: 60,
        justifyContent: 'center',
    },
    submitViewText: {
        width: '100%',
        textAlign: 'center',
        color: Colors.dark.text,
        fontSize: 22,
        fontFamily: 'Poppins-Medium',
    },
})
import { useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import BackBtn from "@/components/backBtn";
import Header from "@/components/onboarding/header";
import BodyView from "@/components/bodyView";
import tags from "@/constants/tags";
import Colors from "@/constants/Colors";

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

    return(
        <ScrollView>
            <BodyView style={ styles.body } >
                <BackBtn pathname="/userData" style={ styles.backBtn } />
                <View style={ styles.container } >
                    <Header style={styles.header} >Personalization</Header>
                    <View>
                        <Text>
                            We have provided some tags to help you monitor and
                            improve your spending habits, you can choose to add more now or later on.
                            e.g Vets, Restaurants, PetFood, Spotify
                        </Text>
                    </View>
                    <View>
                        <ScrollView
                            style={ styles.tagView }
                            nestedScrollEnabled={true}
                            contentContainerStyle={{ flexDirection: 'row' ,flexWrap:'wrap', maxWidth: '100%'}}
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
                </View>
            </BodyView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 5
    },
    container: {
        padding: 5,
    },
    header: {
        fontSize: 29,
    },
    backBtn: {
        marginBottom: 15,
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
        marginTop: 5,
    
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
        height: 110,
        marginTop: 10,
      },
      tagContainerText: {
        fontSize: 11,
        fontFamily: 'Poppins-Medium',
        flexShrink: 1,
        flexWrap: 'wrap'
      },
      tagIconView: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tagIcon: {
        color: Colors.light.red,
      }
})
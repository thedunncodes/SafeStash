import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, FlatList, Image, Dimensions, StatusBar, StyleSheet, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const { width: windowWidth } = Dimensions.get('window')
const pad: number = 14

type CarouselItem = {
    id: string;
    image: string;
  };
  
type CarouselProps = {
    data: CarouselItem[];
  };


  

export default function Carousel({ data }: CarouselProps ) {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const renderItem = useCallback(({item}: {item: CarouselItem}) => {
        return(
            <View style={styles.slide}>
               <Image source={{ uri: item.image }} style={styles.image} />
            </View>
        )
    }, [])
    
    const extendedData = [data[data.length - 1], ...data, data[0]];
      
    
    const getItemLayout = useCallback((_: any, index: number) => ({
        length: (windowWidth - pad),
        offset: (windowWidth - pad) * index,
        index,
    }), [])

    const keyExtractor = useCallback((item: CarouselItem, index: number) => `${item.id}-${index}`, []);
    
    const onScroll = useCallback((event: any) => {
        const offsetY = event.nativeEvent.contentOffset.x;
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / (windowWidth - pad));
        setActiveIndex(index);
        console.log('Scroll Y Position:', offsetY);
    }, [])

    console.log('Active Index', activeIndex);
    console.log(extendedData.indexOf(extendedData[activeIndex]))
    useEffect(() => {
        if (activeIndex === 0) {
          // If we're at the beginning, jump to the "real" last item
          flatListRef.current?.scrollToIndex({ index: data.length, animated: false });
          setActiveIndex(data.length);
        } else if (activeIndex === extendedData.length - 1) {
          // If we're at the end, jump to the "real" first item
          flatListRef.current?.scrollToIndex({ index: 1, animated: false });
          setActiveIndex(1);
        }
      }, [activeIndex, data.length, extendedData.length]);

    return (
        <View style={ styles.container }>
            <FlatList 
                ref={flatListRef}
                data={extendedData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                horizontal
                getItemLayout={getItemLayout}
                onScroll={onScroll}
                pagingEnabled
                initialScrollIndex={1}
                snapToAlignment="center"
            />
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 40,
    },
    slide: {
        width: windowWidth - pad,
        height: 200, // Adjust as needed
    //   justifyContent: 'center',
    //   alignItems: 'center',

    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    pagination: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      marginHorizontal: 4,
    },
    paginationDotActive: {
      backgroundColor: '#007AFF',
    },
  });
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, FlatList, Dimensions, StatusBar, StyleSheet, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { OnboardingPageItem, OnboardingItem } from './onboardingPageItem';
import Colors from '@/constants/Colors';

const { width: windowWidth } = Dimensions.get('window')
const pad: number = 0

type CarouselProps = {
  data: OnboardingItem[],
}

export default function Carousel({ data }: CarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const renderItem = useCallback(({item}: {item: OnboardingItem}) => {
        return <OnboardingPageItem {...item} />
    }, [])
    
    const extendedData = [data[data.length - 1], ...data, data[0]];

    const getItemLayout = useCallback((_: any, index: number) => ({
        length: (windowWidth - pad),
        offset: (windowWidth - pad) * index,
        index,
    }), [])

    const keyExtractor = useCallback((item: OnboardingItem, index: number) => `${item.id}-${index}`, []);
    
    const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.x;
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / (windowWidth - pad));
        setActiveIndex(index);
    }, [])

    useEffect(() => {
        if (activeIndex === 0) {
          flatListRef.current?.scrollToIndex({ index: data.length, animated: false });
          setActiveIndex(data.length);
        } else if (activeIndex === extendedData.length - 1) {
          flatListRef.current?.scrollToIndex({ index: 1, animated: false });
          setActiveIndex(1);
        }
      }, [activeIndex, data.length, extendedData.length]);

    return (
        <View style={ cstyles.container }>
            <View style={cstyles.pagination}>
              {data.map((_, index) => (
                <View
                  key={index}
                  style={[
                    cstyles.paginationDot,
                    (activeIndex === index + 1 || 
                    (activeIndex === data.length + 1 && index === 0) ||
                    (activeIndex === 0 && index === data.length - 1)) && 
                    cstyles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
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
                snapToAlignment="start"
                showsHorizontalScrollIndicator={false}
                disableIntervalMomentum={true}
                initialNumToRender={3} 
            />
        </View>
    )
}

const cstyles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
      position: 'relative',
    },
    pagination: {
      flexDirection: 'row',
      position: 'absolute',
      top: 20,
      zIndex: 1,
      alignSelf: 'center',
    },
    paginationDot: {
      width: 20,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'rgba(77, 195, 255, 0.2)',
      marginHorizontal: 4,
    },
    paginationDotActive: {
      backgroundColor: Colors.light.red,
    },
  });
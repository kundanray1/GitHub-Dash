import React, { FC, useState, useRef } from "react"
import { FlatList, Image, RefreshControl, View, Animated } from "react-native"
import { Button, Screen, Spacer, Text } from "../../components"
import { $globalViewStyles, colors } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import { SearchBar, Card } from "@rneui/themed"
import Config from "../../config"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import * as Styles from "./style"
import { sample } from "./sample"
import { calculateRelativeHeight } from "../../utils/calculateRelativeDimensions"

const welcomeLogo = require("../../../assets/images/logo.png")
const welcomeFace = require("../../../assets/images/welcome-face.png")

export const HomeScreen: FC = function HomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const [id, setId] = useState<string>()
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const heightAnim = useRef(new Animated.Value(calculateRelativeHeight(650))).current;
  const fadeAnim = useRef(new Animated.Value(calculateRelativeHeight(1))).current;

  const {
    data: _repos,
    isFetching: isLoadingData,
    isRefetching: isRefreshingData,
    refetch: refreshData,
    error: _fetchError,
  } = useQuery({
    queryKey: ["repos"],
    queryFn: async () => {
      return sample
    },
    enabled: !!isButtonClicked,
  });

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  const handleClear = () => {
    
    animateTopContainer(calculateRelativeHeight(650));
    animateFade(1)
    setId("");
    queryClient.cancelQueries(["repos"]);
    queryClient.clear();
    setIsButtonClicked(false);
  };

  const renderCard = ({ item }) => {
    return (
      <Card containerStyle={Styles.$cardStyle}>
        <Text preset="bold">{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>
          Stars: {item.stargazers_count} | Forks: {item.forks_count}
        </Text>
        <Text>Language: {item.language}</Text>
      </Card>
    );
  };

  // Function to animate the top container
  const animateTopContainer = (toValue: number) => {
    Animated.timing(heightAnim, {
      toValue,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  };
  const animateFade = (toValue: number) => {
    Animated.timing(fadeAnim, {
      toValue,
      duration: 500, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  };

  return (
    <Screen
      style={Styles.$container}
      preset="fixed"
      contentContainerStyle={$globalViewStyles.fill}
      safeAreaEdges={["top"]}
    >
      
        <Animated.View style={[Styles.$topContainer, {opacity:fadeAnim , maxHeight: heightAnim,}]}>
          <Image style={Styles.$homeLogo} source={welcomeLogo} resizeMode="contain" />
          <Text style={Styles.$homeHeading} tx="HomeScreen.readyForLaunch" preset="heading" />
          <Text text={Config.env} preset="subheading" />
          <Image style={Styles.$homeFace} source={welcomeFace} resizeMode="contain" />
        </Animated.View>
     

      <View style={[Styles.$bottomContainer, $bottomContainerInsets]}>
        <Spacer size={"small"} />
        <View style={[$globalViewStyles.row, $globalViewStyles.center]}>
          <Text text="Search Github Repo" preset="subheading" />
        </View>

        <SearchBar
          platform="ios"
          value={id}
          showCancel={false}
          showLoading={isLoadingData}
          onChangeText={(text) => setId(text)}
          onCancel={handleClear}
          clearIcon={null}
          cancelButtonProps={{ color: colors.text }}
          inputContainerStyle={(_fetchError || true) && Styles.$errorInput}
          errorMessage={_fetchError && "Error Finding Repo"}

        />
        <Button
          disabled={isLoadingData||!id}
          text="Search"
          preset="reversed"
          onPress={() => {
            handleButtonClick();
            animateTopContainer(0);
            animateFade(0) // Minimize the top container on button click
          }}
          style={Styles.$buttonStyle}
        />
        <FlatList
          data={_repos}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          refreshControl={<RefreshControl refreshing={isRefreshingData} onRefresh={refreshData} />}
          onRefresh={refreshData}
          refreshing={isLoadingData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCard}
        />
      </View>
    </Screen>
  );
};

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";

import FilmsItem from "./FilmsItem";
import { getFilmsFromApiWithSearchedText } from "../API/TmdbApi";

const init = {
  films: [],
  search: "",
  page: 0,
  totalPage: 0,
  isLoading: false,
};
const Films = ({ route }) => {
  const [state, setState] = React.useState(init);

  const { params } = route.params;

  const loadFilms = (reload) => {
    if (!state.search) {
      setState(init);
      return;
    }
    setState((state) => ({ ...state, isLoading: true }));

    getFilmsFromApiWithSearchedText(state.search, 1).then((data) => {
      setState((state) => ({
        ...state,
        films: reload ? [...data.results] : [...state.films, ...data.results],
        /*  page: reload ? 0 : state.page + 1,
        totalPage: data.total_pages, */
        isLoading: false,
      }));
    });
  };

  const onHandleChange = (text) => {
    setState((old) => ({ ...old, search: text }));
  };

  return (
    <View style={styles.main}>
      <View style={styles.title}>
        <Text style={styles.text}>
          FILMS {state.page} /{state.totalPage}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Titre du film"
          onChangeText={(e) => onHandleChange(e)}
          onSubmitEditing={() => loadFilms(true)}
          value={state.search}
        />
        <Button title="Rechercher" onPress={() => loadFilms(true)} />
      </View>
      {state.isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.filmList}>
          <FlatList
            data={state.films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <FilmsItem film={item} />}
            /*  onEndReachedThreshold={0.9}
            onEndReached={() =>
              state.page < state.totalPage && loadFilms(false)
            } */
          />
        </View>
      )}
    </View>
  );
};

export default Films;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#20232A",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    //flexDirection: "row",
  },
  title: {
    flex: 1,
    width: "100%",
    color: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  text: {
    color: "#FFFFFF",
    paddingBottom: 10,
  },
  filmList: {
    backgroundColor: "#eaeaea",
    flex: 5,
  },
  loader: {
    backgroundColor: "#eaeaea",
    justifyContent: "center",
    flex: 5,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#FFF",
    padding: 10,
    width: "90%",
    borderRadius: 10,
  },
});

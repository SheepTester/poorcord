for file in ./src/grammar/*.ne
do
  # https://unix.stackexchange.com/a/19656
  nearleyc "$file" -o "${file%.ne}.ts"
done


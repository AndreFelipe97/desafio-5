import { MovieCard } from "./MovieCard";
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from "react-virtualized";

interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 250,
  fixedWidth: true,
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 300,
  spacer: 10,
});

export function Content({ selectedGenre, movies }: ContentProps) {
  function cellRenderer({index, key, parent, style}) {  
    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <MovieCard
            title={movies[index].Title}
            poster={movies[index].Poster}
            runtime={movies[index].Runtime}
            rating={movies[index].Ratings[0].Value}
          />
        </div>
      </CellMeasurer>
    );
  }

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
          <div className="movies-list" >
          <Masonry
            cellCount={movies.length}
            cellMeasurerCache={cache}
            cellPositioner={cellPositioner}
            cellRenderer={cellRenderer}
            height={900}
            width={1000}
          />,
          </div>
      </main>
    </div>
  )
}
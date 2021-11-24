import { Button } from "./Button";
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized';

interface SideBarProps {
  genres: Array<{
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }>;
  selectedGenreId: number;
  buttonClickCallback: (args: any) => void;
}

export function SideBar({
  genres,
  selectedGenreId,
  buttonClickCallback
}: SideBarProps) {
  const rowRenderer: ListRowRenderer = ({index, key, style}) => {
    return (
      <div key={key} style={style}>
        <Button
          key={String(genres[index].id)}
          title={genres[index].title}
          iconName={genres[index].name}
          onClick={() => buttonClickCallback(genres[index].id)}
          selected={selectedGenreId === genres[index].id}
        />
      </div>
    )
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        <List
          height={500}
          rowCount={genres.length}
          rowHeight={70}
          overscanRowCount={5}
          rowRenderer={rowRenderer}
          width={700}
        />
        {/* {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => buttonClickCallback(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))} */}
      </div>

    </nav>
  )
}
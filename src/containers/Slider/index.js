import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trie les événements par date décroissante
  const byDateDesc = data?.focus
    ? [...data.focus].sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date))
    : [];

  useEffect(() => {
    // Met en place un intervalle pour changer automatiquement la carte affichée toutes les 5 secondes
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === byDateDesc.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={`${event.title}-${event.date}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {/* 
            Ajout d'une pagination sous forme de boutons radio.
            Pour chaque événement, on crée un bouton radio qui indique si la carte correspondante est affichée.
            On utilise ici "paginationEvent" pour donner une clé unique à chaque bouton, basée sur le titre et la date de l'événement.
          */}
          {byDateDesc?.map((paginationEvent, idx) => (
            <input
              key={`${paginationEvent.title}-${paginationEvent.date}`}
              type="radio"
              name="radio-button"
              checked={index === idx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

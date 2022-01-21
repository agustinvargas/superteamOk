import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

export default function Chart({
  combat,
  durability,
  intelligence,
  power,
  speed,
  strength,
}) {
  const data = [
    {
      powerstat: "Combate",
      Total: parseInt(combat),
    },
    {
      powerstat: "Resistencia",
      Total: parseInt(durability),
    },
    {
      powerstat: "Inteligencia",
      Total: parseInt(intelligence),
    },
    {
      powerstat: "Poder",
      Total: parseInt(power),
    },
    {
      powerstat: "Velocidad",
      Total: parseInt(speed),
    },
    {
      powerstat: "Fuerza",
      Total: parseInt(strength),
    },
  ];
  return (
    <ResponsiveRadar
      data={data}
      keys={["Total"]}
      indexBy="powerstat"
      margin={{ top: 70, right: 80, bottom: 45, left: 80 }}
      borderColor={{ from: "color" }}
      gridLabelOffset={36}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      colors={{ scheme: "red_blue" }}
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
}

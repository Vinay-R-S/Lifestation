import React from "react";
import { Svg, Path, G, Defs } from "react-native-svg";

interface AvatarProps {
  width?: number;
  height?: number;
  skinColor?: string;
  hairColor?: string;
  eyeColor?: string;
  mouthColor?: string;
  clothesColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  width = 200,
  height = 200,
  skinColor = "#f3d4cf",
  hairColor = "#2a232b",
  eyeColor = "#4e60a3",
  mouthColor = "#da7c87",
  clothesColor = "#09aac5",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet">
      <Defs />
      <G id="svga-group-wrapper">
        {/* Background */}
        <G id="svga-group-backs-single">
          <Path id="SvgjsPath3085" d="M0 0h200v200H0V0z" data-colored="true" data-fillType="tone" data-strokeType="none" fill="#333" strokeWidth="1" opacity="1"/>
        </G>

        {/* Human Body */}
        <G id="svga-group-humanwrap-move" transform="matrix(1,0,0,1,0,0)">
          <G id="svga-group-humanwrap" transform="matrix(1,0,0,1,0,0)">
            {/* Hair back */}
            <G id="svga-group-hair-back-move" transform="matrix(1,0,0,1,0,0)">
              <G id="svga-group-hair-back" transform="matrix(1,0,0,1,0,0)" />
            </G>

            {/* Human Body */}
            <G id="svga-group-humanbody-back">
              <Path id="SvgjsPath3152" d="m168.5 219.5-1.7-21.5s.7-9-8.8-15.3-23.4-10.1-29.5-14.2c-6.1-4.1-9.2-4.5-9-16.9s.9-40.3.9-40.3H79.6s.7 27.9.9 40.3c.2 12.4-2.9 12.8-9 16.9-6.1 4.1-20 7.9-29.5 14.2S33.2 198 33.2 198l-1.6 21.5h136.9z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={skinColor} strokeWidth="1" opacity="1"/>
            </G>

            {/* Chin shadow */}
            <G id="svga-group-chinshadow-single">
              <Path id="SvgjsPath3148" d="M80.4 155.4c5.9 5.8 12.6 9.3 19.6 9.3s13.7-3.5 19.6-9.3c-.1-1.1-.1-2.4-.1-3.8.2-12.4.9-40.3.9-40.3H79.6s.7 27.9.9 40.3c0 1.4 0 2.7-.1 3.8z" data-colored="true" data-fillType="sd2" data-strokeType="none" fill="#d4958a" strokeWidth="1" opacity="0.65"/>
            </G>

            {/* Humanbody */}
            <G id="svga-group-humanbody-front">
              <Path id="SvgjsPath3153" d="M73.8 175.9c5.1 2.9 11.8 5.2 17.6 5.7.4 0 .4-.6.1-.7-2.8-1.1-5.9-1.7-8.8-2.6-2.9-.9-5.8-2-8.8-2.7-.1-.1-.3.2-.1.3zm35.2 6.2c5.3-.6 11.3-3 15.9-5.8.3-.2.1-.6-.2-.5-2.6.9-5.2 2-7.8 2.9-2.6.9-5.4 1.5-8 2.5-.5.1-.5.9.1.9z" data-colored="true" data-fillType="sd2" data-strokeType="none" fill="#d4958a" strokeWidth="1" opacity="1"/>
              <Path id="SvgjsPath3154" d="m168.4 219.4-2.1-21.4c0-2.2-.5-4.5-1.5-6.6-.9-2.1-2.3-3.9-3.9-5.5s-3.5-2.8-5.5-4c-2-1.2-4.1-2.2-6.2-3.1-4.2-1.9-8.6-3.6-12.9-5.4-2.2-.9-4.3-1.9-6.4-3-1.1-.6-2.1-1.2-3-1.9-1-.6-2-1.2-3-1.9s-2-1.5-2.8-2.6c-.8-1-1.3-2.2-1.7-3.4-.7-2.4-.8-4.8-.8-7.2 0-4.7.2-9.4.3-14.1.2-9.4.6-18.7.9-28l.6.6-20.4-.2-20.4-.1.3-.3.7 28c.1 4.7.3 9.3.4 14 0 2.4-.1 4.7-.8 7.1-.3 1.2-.9 2.3-1.6 3.3-.8 1-1.7 1.8-2.7 2.5s-2 1.3-2.9 2c-.9.6-1.9 1.3-3 1.9-2.1 1.2-4.2 2.1-6.4 3.1-4.3 1.9-8.6 3.6-12.8 5.6-2.1 1-4.2 2.1-6.1 3.2-2 1.2-3.8 2.4-5.4 4-1.6 1.6-2.9 3.4-3.8 5.4-.4 1-.8 2.1-1 3.1-.2 1.1-.4 2.2-.3 3.2v.2l-1.5 21.5-1-1.1 34 .1c11.3 0 22.7.1 34.1.2l34.2.3 34.4.5zm.2.2-34 .4-34.2.3c-11.4.1-22.9.2-34.4.2l-34.4.1h-1.1l.1-1.1 1.7-21.5v.1c-.1-5.1 2.2-9.8 5.7-13.3 1.7-1.7 3.8-3.1 5.8-4.3 2-1.2 4.2-2.2 6.3-3.2 4.3-2 8.7-3.7 13-5.4 2.1-.9 4.3-1.8 6.3-2.9 1-.5 1.9-1.1 3-1.8 1-.6 2-1.2 2.9-1.9.9-.6 1.8-1.4 2.4-2.2.7-.9 1.2-1.9 1.5-2.9.6-2.1.8-4.5.8-6.8 0-4.6-.1-9.3-.2-14l-.6-28v-.3h.3l20.4-.1 20.4-.2h.6v.6c-.1 9.3-.2 18.7-.4 28-.1 4.7-.2 9.4-.2 14 .1 2.3.2 4.6.8 6.7.3 1.1.8 2 1.4 2.9.6.8 1.4 1.6 2.4 2.2.9.6 1.9 1.3 2.9 1.9 1 .7 1.9 1.3 2.9 1.8 2 1.1 4.1 2.1 6.3 3 4.3 1.8 8.6 3.6 12.9 5.6 2.1 1 4.2 2.1 6.2 3.3 2 1.2 4 2.6 5.7 4.3 3.4 3.4 5.6 8.1 5.4 13v-.1l1.4 21.6zm-112.8-.4 1.9-13.8.1 13.8h-2zm88.6 0-1.9-13.8-.1 13.8h2z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1"/>
            </G>

            {/* Clothes */}
            <G id="svga-group-clothes-single">
              <Path id="SvgjsPath3285" d="m143.2 220 .1-3.6 26.8-2.6s-1.2-16.5-1.9-20-2.3-8.6-12.1-14-27.7-12.4-27.7-12.4c-31.6 30.5-56-.1-56.7 0 0 0-17.9 7-27.7 12.4s-11.4 10.5-12.1 14-1.9 20-1.9 20l26.8 2.6v3.6h86.4z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={clothesColor} strokeWidth="1" opacity="1"/>
              <Path id="SvgjsPath3286" d="M170.7 213.8c-.4-5.8-.7-11.6-1.3-17.4-.3-2.9-.9-6-2.6-8.6-1.6-2.6-3.9-4.6-6.4-6.3-2.4-1.7-5.1-3.1-7.7-4.4-2.6-1.3-5.3-2.5-7.9-3.7-5.3-2.4-10.7-4.5-16.2-6.6-.2-.1-.5 0-.7.1-3.8 3.8-8 7.1-12.7 9.6-4.7 2.5-9.9 4-15.2 4.1-2.7 0-5.3-.3-7.9-.9-2.6-.7-5.1-1.7-7.4-2.9s-4.6-2.7-6.7-4.3c-1.1-.8-2.1-1.7-3.1-2.6-.5-.4-1-.9-1.4-1.4l-.7-.7-.4-.4-.2-.2-.1-.1-.1-.1s-.2-.1-.3-.1h-.1c-5.4 2.1-10.8 4.2-16.2 6.5-2.7 1.1-5.3 2.3-8 3.6-2.6 1.3-5.2 2.6-7.7 4.3-2.4 1.7-4.8 3.7-6.4 6.3-1.7 2.6-2.4 5.7-2.7 8.6-.7 5.8-1.1 11.6-1.6 17.4 0 .5.4 1 .9 1.1l13.4 1.3 12.5 1.2v2.7c0 .6.5 1 1 1 7.3 0 14.5 0 21.8-.1l21.7-.2 43-.6.2-3.5 13.2-1 13.4-1.1c.4 0 .6-.3.6-.6zm-14.1.8-13.4 1.6c-.1 0-.2.1-.2.2l.1 3.6-43.4-.6-21.5-.2c-6.8-.1-13.6-.1-20.4-.1v-2.6c0-.5-.4-1-.9-1L43.5 214 31 212.9c.4-5.4.8-10.9 1.3-16.3.3-2.9.9-5.6 2.3-7.9 1.5-2.3 3.6-4.2 5.9-5.9 2.3-1.6 4.8-3 7.4-4.3s5.2-2.6 7.8-3.8c5.2-2.4 10.5-4.6 15.8-6.8l.2.1.4.3.7.7c.5.5 1 .9 1.5 1.4 1 .9 2.1 1.8 3.1 2.6 2.2 1.6 4.4 3.1 6.8 4.4 4.8 2.5 10.2 3.9 15.6 3.9s10.8-1.5 15.7-3.9c4.7-2.4 9-5.6 12.8-9.2 5.2 2.1 10.4 4.4 15.6 6.7 2.6 1.2 5.3 2.4 7.8 3.7 2.6 1.3 5.1 2.6 7.4 4.2 2.3 1.6 4.5 3.5 6 5.8s2.2 5 2.4 7.9c.3 2.9.6 5.8.9 8.6l.7 8.1-12.5 1.4zm-100.5-7.3-.3-1.1-.4-1c-.9-2.8-2.3-5.4-3.8-7.9-1.6-2.5-3.4-4.8-5.5-6.8s-4.4-3.9-7-5.1c1.2.8 2.3 1.7 3.4 2.6 1.1.9 2.1 1.9 3.1 3 1.9 2.1 3.7 4.4 5.2 6.8.4.6.7 1.2 1.1 1.8.4.6.7 1.2 1 1.9.3.6.7 1.3 1 1.9.3.7.6 1.3.9 2l.4 1 .4 1 .7 2c.5 1.4.8 2.8 1.3 4.1-.3-1.4-.5-2.9-.9-4.3l-.6-1.9zm92.9-9.9c-1.5 2.5-2.9 5.1-3.8 7.9l-.4 1-.3 1.1-.6 2.1c-.3 1.4-.6 2.8-.9 4.3.5-1.4.8-2.8 1.3-4.1l.7-2 .4-1 .4-1c.3-.6.6-1.3.9-2 .3-.6.6-1.3 1-1.9.3-.6.6-1.3 1-1.9.4-.6.7-1.2 1.1-1.8 1.5-2.4 3.3-4.7 5.2-6.8.9-1.1 2-2.1 3.1-3 1.1-1 2.2-1.9 3.4-2.6-2.6 1.3-4.9 3.1-7 5.1-2.1 1.8-3.9 4.2-5.5 6.6z" data-colored="true" data-fillType="sd2" data-strokeType="none" fill="#008fa6" strokeWidth="1" opacity="1"/>
            </G>

            {/* Head */}
            <G id="svga-group-head" transform="matrix(1,0,0,1,0,0)">
              {/* Left ear */}
              <G id="svga-group-ears-left-move" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-group-ears-left" transform="matrix(1,0,0,1,0,0)">
                  <Path id="SvgjsPath3102" d="M64.2 96.3c-.2-.3-3.1-4-5.5-6.3-2.5-2.3-3.2-2.2-4.4-.8s-2.7 8.5-2.3 11.7 3.3 8.2 4.9 11c1.6 2.8 3.1 6.3 4.8 6 1.8-.3 4.2-4.3 5.3-7.3 1.2-3 .6-10.3-2.8-14.3z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={skinColor} strokeWidth="1" opacity="1"/>
                  <Path id="SvgjsPath3103" d="M67.9 104.8c.1.8.2 1.6.2 2.4s0 1.6-.2 2.4l-.3 1.2c-.1.4-.3.7-.4 1-.3.7-.6 1.3-.9 2-.7 1.2-1.4 2.4-2.4 3.4-.5.5-1 1-1.7 1.2-.3.1-.8.1-1.2 0-.4-.2-.7-.4-1-.7-1.2-1.2-1.8-2.6-2.5-4s-1.4-2.7-2.1-4.1c-.7-1.4-1.4-2.8-2-4.2-.3-.7-.6-1.4-.9-2.2-.3-.7-.5-1.5-.6-2.3-.2-1.6 0-3.2.1-4.7.2-1.5.4-3 .8-4.5.2-.7.4-1.5.7-2.2.1-.2.2-.3.3-.5s.2-.4.3-.5c.2-.3.5-.5.8-.7s.7-.3 1.1-.3c.4.1.7.2 1.1.4.6.4 1.1.9 1.7 1.4 2 2.1 3.7 4.5 5.6 6.8 1.8 2.5 2.9 5.6 3.5 8.7zm-9.6-14.6c-1-.8-2.2-1.7-2.9-1.2-.2.1-.4.3-.6.6-.1.1-.2.2-.2.3-.1.1-.1.3-.2.4-.3.6-.5 1.2-.7 1.9-.4 1.3-.8 2.8-1.1 4.2-.3 1.4-.5 3-.4 4.4.1.7.3 1.5.5 2.2l.9 2.1c.6 1.4 1.4 2.7 2.2 4s1.6 2.6 2.3 3.9c.4.7.7 1.3 1.1 1.9.4.6.8 1.2 1.2 1.6s.8.6 1.2.4.9-.5 1.3-1c.8-.9 1.5-2 2.2-3.2l.9-1.8c.1-.3.3-.6.4-.9l.2-.4c0-.2.1-.3.1-.5.3-1.3.3-2.8.3-4.3-.1-1.5-.3-3-.8-4.5s-1.2-2.9-2.1-4c-1.7-2.2-3.7-4.4-5.8-6.1z" data-colored="true" data-fillType="sd1" data-strokeType="none" fill="#e4b3ab" strokeWidth="1" opacity="1"/>
                  <Path id="SvgjsPath3104" d="M54.1 102.4c-.2-2.1-.4-7.4.8-9 2-2.7 5.6 6.1 6.5 8.8 0 .1.1.2.1.2.1.3-.1.7-.4.6-.4-.2-.8-.6-1.2-.8-1.1-.5-1.5.4-1.2 1.7.4 1.7 1.3 2.7 2.1 4 .1.2 0 .4-.2.3-1.5-.9-3.3-4.2-2.9-6.2.3-1.8 1.8-1.7 2.9-.8-.7-1.6-1.4-3.1-2.3-4.5-.6-.9-1.1-1.9-2-2-1.1-.2-.9.3-1.1 1.7-.8 4.6-.3 9.7 2.4 13.7.1.1 0 .2-.1.1-2-2.2-3.1-4.7-3.4-7.8z" data-colored="true" data-fillType="sd2" data-strokeType="none" fill="#d4958a" strokeWidth="1" opacity="1"/>
                </G>
              </G>

              {/* Right ear */}
              <G id="svga-group-ears-right-move" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-group-ears-right" transform="matrix(1,0,0,1,0,0)">
                  <Path id="SvgjsPath3105" d="M135.8 96.3c.2-.3 3.1-4 5.5-6.3 2.5-2.3 3.2-2.2 4.4-.8s2.7 8.5 2.3 11.7-3.3 8.2-4.9 11c-1.6 2.8-3.1 6.3-4.8 6-1.8-.3-4.2-4.3-5.3-7.3-1.2-3-.6-10.3 2.8-14.3z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={skinColor} strokeWidth="1" opacity="1"/>
                  <Path id="SvgjsPath3106" d="M135.7 96.3c1.8-2.3 3.5-4.7 5.6-6.8.5-.5 1-1 1.7-1.4.3-.2.7-.4 1.1-.4.4-.1.8.1 1.1.3.3.2.6.5.8.7.1.1.2.3.3.5s.2.3.3.5c.3.7.5 1.4.7 2.2.4 1.5.6 3 .8 4.5.1 1.5.3 3.1.1 4.7-.1.8-.3 1.6-.6 2.3-.3.8-.6 1.5-.9 2.2-.6 1.4-1.3 2.8-2 4.2-.7 1.4-1.4 2.7-2.1 4.1-.7 1.4-1.4 2.8-2.5 4-.3.3-.6.6-1 .7s-.9.2-1.2 0c-.7-.2-1.2-.7-1.7-1.2-1-1-1.7-2.2-2.4-3.4-.3-.6-.6-1.3-.9-2-.1-.3-.3-.7-.4-1l-.3-1.2c-.1-.8-.2-1.6-.2-2.4s.1-1.6.2-2.4c.5-3.3 1.6-6.4 3.5-8.7zm.1.1c-.9 1.1-1.6 2.5-2.1 4s-.7 3-.8 4.5 0 3 .3 4.3c0 .2.1.3.1.5l.2.4c.1.3.3.6.4.9l.9 1.8c.6 1.2 1.4 2.3 2.2 3.2.4.4.9.8 1.3 1 .4.2.8 0 1.2-.4s.8-1 1.2-1.6.8-1.3 1.1-1.9c.7-1.3 1.6-2.6 2.3-3.9.8-1.3 1.5-2.6 2.2-4l.9-2.1c.3-.7.5-1.5.5-2.2.1-1.5-.1-3-.4-4.4-.3-1.4-.6-2.9-1.1-4.2-.2-.7-.5-1.3-.7-1.9-.1-.1-.1-.3-.2-.4-.1-.1-.1-.2-.2-.3l-.6-.6c-.7-.6-1.8.4-2.9 1.2-2 1.6-4 3.8-5.8 6.1z" data-colored="true" data-fillType="sd1" data-strokeType="none" fill="#e4b3ab" strokeWidth="1" opacity="1"/>
                  <Path id="SvgjsPath3107" d="M145.9 102.4c.2-2.1.4-7.4-.8-9-2-2.7-5.6 6.1-6.5 8.8 0 .1-.1.2-.1.2-.1.3.1.7.4.6.4-.2.8-.6 1.2-.8 1.1-.5 1.5.4 1.2 1.7-.4 1.7-1.3 2.7-2.1 4-.1.2 0 .4.2.3 1.5-.9 3.3-4.2 2.9-6.2-.3-1.8-1.8-1.7-2.9-.8.7-1.6 1.4-3.1 2.3-4.5.6-.9 1.1-1.9 2-2 1.1-.2.9.3 1.1 1.7.8 4.6.3 9.7-2.4 13.7-.1.1 0 .2.1.1 2-2.2 3.1-4.7 3.4-7.8z" data-colored="true" data-fillType="sd2" data-strokeType="none" fill="#d4958a" strokeWidth="1" opacity="1"/>
                </G>
              </G>

              {/* Face shape */}
              <G id="svga-group-faceshape-wrap" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-group-faceshape-single">
                  <Path id="SvgjsPath3134" d="M141 88.4c0 30.3-18.9 65.2-41 65.2s-41-34.9-41-65.2 18.9-47 41-47 41 16.6 41 47z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={skinColor} strokeWidth="1" opacity="1"/>
                  <Path id="SvgjsPath3135" d="M100 41.3c-22.1 0-41.1 16.7-41.1 47s19 65.5 41.1 65.5 41.1-35.2 41.1-65.5-19-47-41.1-47zm28.2 13.6.8.8c.3.3.5.6.8.9.3.3.5.6.8.9l.7.9c.2.3.5.6.7.9l.7 1 .3.5.3.5c.4.7.9 1.3 1.2 2l.6 1c.2.3.4.7.5 1l.5 1.1.5 1.1c.2.4.3.7.5 1.1l.4 1.1c2.3 5.9 3.2 12.4 3.3 18.7 0 6.4-.9 12.8-2.6 18.9-.8 3.1-1.9 6.1-3.1 9-1.2 2.9-2.5 5.8-4 8.6s-3.1 5.5-4.8 8.1c-.9 1.3-1.8 2.6-2.7 3.8-.9 1.2-1.9 2.4-3 3.6-2 2.3-4.3 4.4-6.7 6.3-2.4 1.8-5 3.3-7.8 4.3-1.4.5-2.8.9-4.3 1-1.5.2-2.9.2-4.4.1-3-.2-5.9-1.2-8.6-2.6-2.7-1.4-5.3-3.3-7.6-5.4-2.3-2.1-4.4-4.5-6.3-7.1s-3.6-5.3-5-8.1c-1.5-2.8-2.8-5.7-3.9-8.7-.6-1.5-1.1-3-1.6-4.5s-.9-3-1.3-4.6c-.8-3.1-1.4-6.2-1.8-9.3-.4-3.1-.7-6.3-.8-9.4 0-1.6 0-3.1.1-4.7 0-.8.1-1.6.1-2.3l.2-2.3c.3-3.1.9-6.2 1.7-9.1.8-3 1.8-5.9 3.2-8.6.2-.4.3-.7.5-1l.5-1c.4-.7.8-1.3 1.2-2 .4-.6.8-1.3 1.3-1.9l.7-.9.3-.5.4-.4c1.9-2.4 4.1-4.5 6.5-6.3s5-3.3 7.8-4.5 5.7-2 8.6-2.5c.7-.2 1.5-.2 2.2-.3.4-.1.8-.1 1.1-.1l1.1-.1c.8 0 1.5-.1 2.3-.1H102.6l1.1.1c.4 0 .8.1 1.1.1.4 0 .8.1 1.1.1l1.1.2.6.1.6.1 1.1.2c.4.1.7.2 1.1.3s.7.2 1.1.3c1.4.4 2.9.9 4.3 1.5s2.8 1.2 4.1 2c2.7 1.5 5.2 3.3 7.4 5.4l.4.4.5.3z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1"/>
                </G>
              </G>

              {/* Mouth */}
              <G id="svga-group-mouth-single-move" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-group-mouth-single" transform="matrix(1,0,0,1,0,0)">
                  <Path id="SvgjsPath3090" d="M86.9 128.6s2-.5 3.7-2.3c1.8-1.8 2.3-2.2 3.2-2.6 1-.4 3.2-1 4.9.4 1.6 1.3 2 .5 2.7 0s2-1.4 4.2-.6 4.3 3.4 5.6 4.1 2.2.9 2.2.9-1.7 2.4-3.1 3.8c-1.9 2-4.3 2.7-8.6 3-4.3.3-7.2-.5-9-1.7-1.9-1.2-3.5-3.2-3.9-3.6-.5-.5-1.9-1.4-1.9-1.4z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={mouthColor} strokeWidth="1" opacity="1" transform="translate(0 3)"/>
                  <Path id="SvgjsPath3091" d="M86.2 128.6c1.8.9 3.6.8 5.5.4 1.4-.3 2.9-.6 4.3-.5s2.7.8 4.2.9c1.1 0 2-.4 3-.7 1.9-.6 3.5-.3 5.4.1 1.9.4 4 1 5.7-.2.3-.2.1-.6-.2-.6-2.7.5-4.7-.2-7.4-.6-2.4-.4-4.4 1.1-6.8.8-2-.2-3.5-1-5.5-.7-2.7.3-5.2 1.4-7.9.4-.4 0-.6.6-.3.7z" data-colored="true" data-fillType="sd1" data-strokeType="none" fill="#cb5f6c" strokeWidth="1" opacity="1" transform="translate(0 3)"/>
                  <Path id="SvgjsPath3092" d="M109.8 130.3c-4.4.3-8.6 1.8-13 1.6-.2 0-.3.3-.1.4 4.3 1.1 9.6 1.4 13.2-1.8.1-.1 0-.2-.1-.2z" data-colored="true" data-fillType="hl1" data-strokeType="none" fill="#e99ca5" strokeWidth="1" opacity="1" transform="translate(0 3)"/>
                </G>
              </G>

              {/* Left eye */}
              <G id="svga-group-eyes-left-move" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-group-eyes-left" transform="matrix(1,0,0,1,0,0)">
                  <G id="svga-group-eyesback-left">
                    <Path id="SvgjsPath3207" d="M90.9 101.3s-.3-2.5-1-3.8-3.7-4.4-7-5c-4.9-1-9.3 1.7-9.3 1.7s0 2.4 1.5 4.1c1.4 1.7 3.9 2.6 4.9 2.7s4.6.3 6.5 0c1.3-.2 2.8-.2 3.4 0 .5.2 1 .3 1 .3z" data-colored="false" data-fillType="#ffffff" data-strokeType="none" fill="#ffffff" strokeWidth="1" opacity="1"/>
                  </G>
                  <G id="svga-group-eyesiriswrapper-left" transform="matrix(1,0,0,1,0,0)">
                    <G id="svga-group-eyesiriscontrol-left" transform="matrix(1,0,0,1,0,0)">
                      <G id="svga-group-eyesiris-left" transform="matrix(1,0,0,1,0,0)">
                        <Path id="SvgjsPath3169" d="M82 91.5c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={eyeColor} strokeWidth="1" opacity="1" />
                        <Path id="SvgjsPath3170" d="M82 93.8c1.4 0 2.6 1.2 2.6 2.6S83.4 99 82 99s-2.6-1.2-2.6-2.6 1.2-2.6 2.6-2.6z" data-colored="false" data-fillType="#000000" data-strokeType="none" fill="#000000" strokeWidth="1" opacity="1" />
                        <Path id="SvgjsPath3171" d="m81.3 94.3-.5-.5c-.2-.2-.4-.3-.7-.3s-.5.1-.7.3c-.2.2-.3.4-.3.7s.1.5.3.7l.5.5c.2.2.4.3.7.3.2 0 .5-.1.7-.3.4-.5.4-1 0-1.4zm2.5 4.4c.8 0 .8-1.3 0-1.3s-.9 1.3 0 1.3z" data-colored="false" data-fillType="#ffffff" data-strokeType="none" fill="#ffffff" strokeWidth="1" opacity="1" />
                      </G>
                    </G>
                  </G>
                  <G id="svga-group-eyesfront-left">
                    <Path id="SvgjsPath3215" d="M70.73 98.03c0 6.9 4.93 12.5 11.02 12.5s11.02-5.6 11.02-12.5-4.93-12.5-11.02-12.5-11.02 5.59-11.02 12.5zm2.88-3.78s4.42-2.71 9.34-1.75c3.29.64 6.2 3.74 6.95 5.03.75 1.28 1.03 3.82 1.03 3.82s-.53-.14-1.11-.32c-.57-.18-2.05-.19-3.39.04-1.89.32-5.46.18-6.45.04-1-.14-3.49-1.07-4.92-2.75-1.41-1.69-1.45-4.11-1.45-4.11z" data-colored="true" data-fillType="tone" data-strokeType="none" data-fromskin="true" fill={skinColor} strokeWidth="1" opacity="1" />
                    <Path id="SvgjsPath3216" d="M73.27 94.64c-.1.42-.12.84-.06 1.25-.57-.03-1.21.05-1.59.44-.14.14.01.33.18.3.3-.05.58-.2.88-.27.21-.05.42-.06.63-.05.06.21.13.42.22.63-.18.06-.35.14-.5.21-.38.17-.75.42-.99.76-.11.15.09.28.22.22.35-.16.68-.38 1.03-.55.15-.07.32-.12.49-.18.16.28.35.54.56.8-.41.24-.78.58-.9 1.03-.03.1.09.21.19.15.36-.24.65-.57.96-.88 1.11 1.22 2.67 2.16 3.92 2.57 1.88.62 3.93.72 5.89.62 1.85-.09 4.72-1.14 6.43-.21.07.04.13.02.17-.02l.03-.03c.01-.02.02-.04.02-.06 0-.01.01-.01.01-.03-.1-4.06-2.64-7.49-6.4-8.97-2.08-.82-4.37-1.02-6.58-.69-2.59.39-4.87 1.66-7.54 1.44-.23-.02-.34.3-.18.44.9.88 1.89 1.13 2.91 1.08zm.67-.07c1.99-.32 4.11-1.54 6.09-1.68 5.13-.36 10.05 3 10.7 8.24-2.39-.82-5.13-.1-7.59-.15-2.01-.04-4.14-.32-5.91-1.34-2.21-1.28-2.61-2.93-3.29-5.07z" data-colored="true" data-fillType="tone" data-strokeType="none" fill="#000000" strokeWidth="1" opacity="1" />
                  </G>
                </G>
              </G>

              {/* Right eye */}
              <G id="svga-group-eyes-right-move" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-group-eyes-right" transform="matrix(1,0,0,1,0,0)">
                  <G id="svga-group-eyesback-right">
                    <Path id="SvgjsPath3208" d="M109.1 101.3s.3-2.5 1-3.8 3.7-4.4 7-5c4.9-1 9.3 1.7 9.3 1.7s0 2.4-1.5 4.1c-1.4 1.7-3.9 2.6-4.9 2.7s-4.6.3-6.5 0c-1.3-.2-2.8-.2-3.4 0-.5.2-1 .3-1 .3z" data-colored="false" data-fillType="#ffffff" data-strokeType="none" fill="#ffffff" strokeWidth="1" opacity="1" />
                  </G>
                  <G id="svga-group-eyesiriswrapper-right" transform="matrix(1,0,0,1,0,0)">
                    <G id="svga-group-eyesiriscontrol-right" transform="matrix(1,0,0,1,0,0)">
                      <G id="svga-group-eyesiris-right" transform="matrix(1,0,0,1,0,0)">
                        <Path id="SvgjsPath3172" d="M118 91.5c2.7 0 4.9 2.2 4.9 4.9s-2.2 4.9-4.9 4.9-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={eyeColor} strokeWidth="1" opacity="1" />
                        <Path id="SvgjsPath3173" d="M118 93.8c1.4 0 2.6 1.2 2.6 2.6S119.4 99 118 99s-2.6-1.2-2.6-2.6 1.2-2.6 2.6-2.6z" data-colored="false" data-fillType="#000000" data-strokeType="none" fill="#000000" strokeWidth="1" opacity="1" />
                        <Path id="SvgjsPath3174" d="m117.4 94.3-.5-.5c-.2-.2-.4-.3-.7-.3s-.5.1-.7.3c-.2.2-.3.4-.3.7s.1.5.3.7l.5.5c.2.2.4.3.7.3.2 0 .5-.1.7-.3.3-.5.4-1 0-1.4zm2.4 4.4c.8 0 .8-1.3 0-1.3s-.8 1.3 0 1.3z" data-colored="false" data-fillType="#ffffff" data-strokeType="none" fill="#ffffff" strokeWidth="1" opacity="1" />
                      </G>
                    </G>
                  </G>
                  <G id="svga-group-eyesfront-right">
                    <Path id="SvgjsPath3217" d="M118.26 85.53c-6.08 0-11.02 5.6-11.02 12.5s4.93 12.5 11.02 12.5 11.02-5.6 11.02-12.5-4.94-12.5-11.02-12.5zm6.67 12.82c-1.43 1.68-3.92 2.6-4.92 2.75-1 .14-4.56.29-6.45-.04-1.34-.23-2.82-.21-3.39-.04-.57.18-1.11.32-1.11.32s.29-2.53 1.03-3.82c.75-1.28 3.66-4.38 6.95-5.03 4.92-.96 9.34 1.75 9.34 1.75s-.03 2.43-1.45 4.11z" data-colored="true" data-fillType="tone" data-strokeType="none" data-fromskin="true" fill={skinColor} strokeWidth="1" opacity="1" />
                    <Path id="SvgjsPath3220" d="M129.64 93.58c.15-.15.04-.46-.18-.44-2.68.22-4.96-1.05-7.54-1.44-2.21-.33-4.49-.13-6.58.69-3.76 1.48-6.31 4.91-6.4 8.97 0 .01.01.02.01.03 0 .02.01.04.02.06l.03.03c.04.04.1.06.17.02 1.71-.93 4.58.11 6.43.21 1.96.1 4.02-.01 5.89-.62 1.25-.41 2.81-1.35 3.92-2.57.31.31.6.64.96.88.1.06.22-.04.19-.15-.12-.45-.5-.79-.9-1.03.21-.26.4-.52.56-.8.17.06.34.11.49.18.35.17.68.39 1.03.55.13.06.33-.07.22-.22-.25-.34-.61-.59-.99-.76-.15-.07-.32-.15-.5-.21.09-.21.17-.42.22-.63.21 0 .42.01.63.05.3.07.58.21.88.27.17.03.31-.16.18-.3-.38-.39-1.02-.48-1.59-.44.06-.41.04-.83-.06-1.25 1.02.03 2.01-.22 2.91-1.08zm-6.87 6.06c-1.77 1.03-3.9 1.3-5.91 1.34-2.46.05-5.21-.67-7.59.15.65-5.24 5.56-8.6 10.7-8.24 1.98.14 4.1 1.36 6.09 1.68-.68 2.14-1.08 3.79-3.29 5.07z" data-colored="true" data-fillType="tone" data-strokeType="none" fill="#000000" strokeWidth="1" opacity="1" />
                  </G>
                </G>
              </G>

              {/* Face highlight */}
              <G id="svga-group-facehighlight-single" />

              {/* Left eyebrows */}
              <G id="svga-group-eyebrows-left-move" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-group-eyebrows-left-rotate" transform="matrix(1,0,0,1,0,0)">
                  <G id="svga-group-eyebrows-left" transform="matrix(1,0,0,1,0,0)">
                    <Path id="SvgjsPath3261" d="M68.8 86s.1 0 0 0c.1-.1.1-.1.1-.2.3-.6.9-1 1.4-1.3.6-.4 1.3-.9 1.9-1.3h.1c1.5-1.1 4-1.3 6-.8 1.9.2 3.8.8 5 1.3.1 0 .2.1.4.1 1.6.3 3.3.6 4.8 1.2 1.5.3 3 .5 4.4 1h.1c.1-.1.4 0 .4.2.1.2.1.4 0 .7.2 0 .3.1.3.3-.1.5-.3.9-.6 1.3v.1c-.3.8-.9 1.1-1.8 1-.1 0-.2 0-.4-.1-.1.1-.2.1-.3.1-1.6-.1-3.2-.8-4.6-1.4-.9-.4-1.9-.8-2.8-1.3-1.4-.2-2.8-.6-4.2-.9-1.3-.3-2.8-.3-4-.8-.4.1-.9.1-1.3.2-.3.1-.6.2-1 .2-1 .3-2.2.8-3.2.9h-.1c-.1 0-.1.1-.2.1-.2.2-.4.4-.7.5-.1 0-.3-.1-.3-.2 0-.5.3-.7.6-.9z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={hairColor} strokeWidth="1" opacity="1" />
                    <Path id="SvgjsPath3262" d="M89.9 85.4c1.3.8 1.5 2.8 1.3 4.2 0 .3-.5.3-.6 0-.2-.7-.2-1.4-.3-2.1-.2-.6-.4-1.1-.7-1.7-.1-.3.1-.6.3-.4zm-3.2-.9c2.1.4 3.4 2.9 3.6 4.8 0 .2-.3.2-.3.1-.2-1-.6-1.9-1.2-2.7-.6-.8-1.4-1.3-2.2-2-.1-.1 0-.3.1-.2zM81 83.1c.9.2 1.9 1 2.6 1.7.7.7 1.3 1.5 1.5 2.4 0 .2-.2.3-.3.2-.5-.8-.9-1.6-1.7-2.2-.7-.6-1.6-1-2.2-1.8-.1-.2-.1-.3.1-.3zM76.3 82c2.3 0 4.7 2.1 5.4 4.2.1.2-.2.3-.3.1-.6-.9-1.2-1.8-2.1-2.5-.9-.7-1.9-1-3-1.4-.3-.1-.3-.4 0-.4zm-5.6 2.4c2.1-2.7 6.2-1.8 7.9.8.1.2-.2.4-.3.2-1-.9-2.1-1.9-3.5-2-1.5-.2-2.7.8-3.9 1.3-.3.1-.3-.2-.2-.3z" data-colored="true" data-fillType="hl1" data-strokeType="none" fill="#3a353a" strokeWidth="1" opacity="1" />
                    <Path id="SvgjsPath3263" d="M92.1 90.3c1.6-.4 2-2.2 2-3.7 0-.3-.4-.3-.5-.1-.2.6-.4 1.3-.7 1.8-.3.5-.7.8-1.1 1 .4-1.2.2-2.6-.6-3.7.6.1 1.1.3 1.7.4.2 0 .3-.2.1-.3-2.7-1-5.6-1.6-8.3-2.4-2.4-.7-4.9-1.4-7.3-1.7-4.6-.6-7.6 2.4-10.3 5.7-.1.1-.2.2-.3.2-.4.3 0 .9.4.6 2.5-1.5 5-2.4 7.9-2.4 3.1.1 6.2 1.1 9.2 2.1 1.6.6 3.1 1.2 4.6 1.8 1 .6 2.1 1 3.2.7zm-20-6.8c1-.7 2.1-1 3.1-1.1.8.4 1.6.8 2.3 1.4.5.5.9 1.1 1.3 1.6-.1 0-.2-.1-.4-.1-3.4-.7-6.6-.4-9.5 1 1-1 2-2 3.2-2.8zm19.3 6c-.5 0-1.1-.1-1.7-.3-1.2-.4-2.4-1-3.6-1.5-.2-.1-.4-.1-.6-.2 0-.9-.3-1.8-.9-2.4-.1-.1-.3 0-.2.2.3.7.7 1.4.9 2.1-.8-.3-1.5-.6-2.3-.8-.7-1.5-2.1-3.1-3.6-3.8-.2-.1-.3.2-.2.3.6.6 1.3 1 1.9 1.7.5.5.9 1.1 1.3 1.7-1-.3-1.9-.6-2.9-.8-.2-.8-.9-1.6-1.5-2.1-.4-.4-1-.8-1.5-1.1.9 0 1.9.1 2.8.3 3.8.8 7.6 1.9 11.4 2.8.8 1.2 1 2.5.7 3.9z" data-colored="true" data-fillType="sd1" data-strokeType="none" fill="#1b141c" strokeWidth="1" opacity="1" />
                  </G>
                </G>
              </G>

              {/* Right eyebrows */}
              <G id="svga-group-eyebrows-right-move" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-group-eyebrows-right-rotate" transform="matrix(1,0,0,1,0,0)">
                  <G id="svga-group-eyebrows-right" transform="matrix(1,0,0,1,0,0)">
                    <Path id="SvgjsPath3264" d="M131.2 86s-.1 0 0 0c-.1-.1-.1-.1-.1-.2-.3-.6-.9-1-1.4-1.3-.6-.4-1.3-.9-1.9-1.3h-.1c-1.5-1.1-4-1.3-6-.8-1.9.2-3.8.8-5 1.3-.1 0-.2.1-.4.1-1.6.3-3.3.6-4.8 1.2-1.5.3-3 .5-4.4 1h-.1c-.1-.1-.4 0-.4.2-.1.2-.1.4 0 .7-.2 0-.3.1-.3.3.1.5.3.9.6 1.3v.1c.3.8.9 1.1 1.8 1 .1 0 .2 0 .4-.1.1.1.2.1.3.1 1.6-.1 3.2-.8 4.6-1.4.9-.4 1.9-.8 2.8-1.3 1.4-.2 2.8-.6 4.2-.9 1.3-.3 2.8-.3 4-.8.4.1.9.1 1.3.2.3.1.6.2 1 .2 1 .3 2.2.8 3.2.9h.1c.1 0 .1.1.2.1.2.2.4.4.7.5.1 0 .3-.1.3-.2 0-.5-.3-.7-.6-.9z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={hairColor} strokeWidth="1" opacity="1"/>
                    <Path id="SvgjsPath3265" d="M110.1 85.4c-1.3.8-1.5 2.8-1.3 4.2 0 .3.5.3.6 0 .2-.7.2-1.4.3-2.1.2-.6.4-1.1.7-1.7.1-.3-.1-.6-.3-.4zm3.2-.9c-2.1.4-3.4 2.9-3.6 4.8 0 .2.3.2.3.1.2-1 .6-1.9 1.2-2.7.6-.8 1.4-1.3 2.2-2 .1-.1 0-.3-.1-.2zm5.7-1.4c-.9.2-1.9 1-2.6 1.7-.7.7-1.3 1.5-1.5 2.4 0 .2.2.3.3.2.5-.8.9-1.6 1.7-2.2.7-.6 1.6-1 2.2-1.8.1-.2.1-.3-.1-.3zm4.7-1.1c-2.3 0-4.7 2.1-5.4 4.2-.1.2.2.3.3.1.6-.9 1.2-1.8 2.1-2.5.9-.7 1.9-1 3-1.4.3-.1.3-.4 0-.4zm5.6 2.4c-2.1-2.7-6.2-1.8-7.9.8-.1.2.2.4.3.2 1-.9 2.1-1.9 3.5-2 1.5-.2 2.7.8 4 1.3.2.1.2-.2.1-.3z" data-colored="true" data-fillType="hl1" data-strokeType="none" fill="#3a353a" strokeWidth="1" opacity="1"/>
                    <Path id="SvgjsPath3266" d="M111.1 89.8c1.5-.6 3.1-1.2 4.6-1.8 2.9-1 6.1-2.1 9.2-2.1 2.9-.1 5.5.9 7.9 2.4.4.2.8-.4.4-.6-.1-.1-.2-.2-.4-.2-2.7-3.3-5.7-6.2-10.3-5.7-2.5.3-4.9 1.1-7.3 1.7-2.8.8-5.6 1.4-8.3 2.4-.2.1-.1.3.1.3.6-.1 1.1-.2 1.7-.4-.8 1-1 2.5-.6 3.7-.4-.1-.8-.4-1.1-1-.3-.6-.4-1.2-.7-1.8-.1-.2-.5-.2-.5.1.1 1.4.5 3.2 2 3.7 1.2.1 2.3-.3 3.3-.7zm19.9-3.5c-3-1.4-6.2-1.7-9.5-1-.1 0-.2.1-.4.1.4-.5.8-1.1 1.3-1.6.7-.6 1.5-.9 2.3-1.4 1.1.1 2.1.5 3.1 1.1 1.3.8 2.3 1.8 3.2 2.8zm-21.6-.7c3.8-.9 7.6-2 11.4-2.8 1-.2 1.9-.3 2.8-.3-.6.3-1.1.7-1.5 1.1-.6.5-1.3 1.3-1.5 2.1-1 .2-2 .5-2.9.8.4-.6.8-1.2 1.3-1.7.6-.6 1.3-1.1 1.9-1.7.1-.1 0-.3-.2-.3-1.5.6-2.9 2.2-3.6 3.8-.8.2-1.6.5-2.3.8.2-.7.5-1.4.9-2.1.1-.2-.1-.3-.2-.2-.6.6-.9 1.6-.9 2.4-.2.1-.4.1-.6.2-1.2.5-2.4 1.1-3.6 1.5-.6.2-1.2.4-1.7.3-.4-1.4-.2-2.7.7-3.9z" data-colored="true" data-fillType="sd1" data-strokeType="none" fill="#1b141c" strokeWidth="1" opacity="1"/>
                  </G>
                </G>
              </G>

              {/* Nose */}
              <G id="svga-group-nose-single-move" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-group-nose-single" transform="matrix(1,0,0,1,0,0)">
                  <Path id="SvgjsPath3247" d="M97.72 89.37c-.8 3.33-.91 6.89-1.27 10.29-.38 3.64-1.08 7.4-1.03 11.06 0 .29.45.37.52.07.74-3.34.83-6.91 1.18-10.31.37-3.64 1.05-7.41.93-11.06 0-.19-.28-.24-.33-.05z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1" transform="translate(0 2)"/>
                  <Path id="SvgjsPath3248" d="M94.71 108.8c-.98 1.31-1.8 2.73-2.52 4.2-.46.95-1.04 2.07-.73 3.16.5 1.8 2.79 2.36 4.28 1.51.44-.26.24-.95-.26-.95-.87-.01-1.89.27-2.58-.47-.84-.89-.01-2.5.36-3.4.55-1.32 1.22-2.59 1.74-3.92.07-.19-.19-.26-.29-.13z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1" transform="translate(0 2)"/>
                  <Path id="SvgjsPath3249" d="M94.57 116.21c2.7-.2 3.21 3.2 5.78 3.28 2.2.07 2.37-3.24 4.46-3.14.24.01.32-.33.12-.45-2.37-1.4-2.81 2.72-4.99 2.46-1.29-.15-2.21-2.05-3.37-2.6-.79-.37-1.36-.34-2.13.01-.19.11-.09.46.13.44z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1" transform="translate(0 2)" />
                  <Path id="SvgjsPath3250" d="M104.07 117.75c1.78.4 3.85-.15 4.27-2.13.21-.99-.12-1.97-.64-2.81-.84-1.37-1.93-2.53-2.73-3.95-.13-.24-.47-.12-.48.13-.1 1.59 1.08 2.69 1.92 3.92.78 1.13 1.45 2.69.14 3.81-.6.51-1.74.42-2.48.56-.24.05-.23.42 0 .47z" data-colored="true" data-fillType="sd3" data-strokeType="none" fill="#c5796d" strokeWidth="1" opacity="1" transform="translate(0 2)" />
                  <Path id="SvgjsPath3251" d="M102.32 112.41c-.39-.7-1.4-.81-1.96-.25-.05.05-.23.28-.28.34-.06.08-.19.25-.21.28-.06.1-.12.2-.17.3l-.11.26c0-.01-.01.01-.03.05-.06.06-.12.13-.17.19-.17.18-.34.36-.48.57-.4.63-.08 1.35.46 1.75.83.62 2.03.12 2.61-.58.7-.84.89-1.92.34-2.91z" data-colored="true" data-fillType="hl05" data-strokeType="none" fill="#fbe5e2" strokeWidth="1" opacity="1" transform="translate(0 2)" />
                </G>
              </G>

              {/* Hair */}
              <G id="svga-group-hair-front" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-hair">
                  <Path id="SvgjsPath3302" d="M75.1 60.2s9.5 11.9 24.4 14.5c14.9 2.6 28.5 2 33.7 9.5s4.4 23.6 4.4 23.6 5.9-14.5 6.3-20c.4-5.6 1-26.1-11.9-38.6s-43-21-59-2c0 0-11.3.4-16.8 18.8s5.5 42.8 5.5 42.8S60 92 65.2 83.2c6.7-11.5 8.7-14.3 9.9-23z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={hairColor} strokeWidth="1" opacity="1" />
                  <Path id="SvgjsPath3303" d="M137.2 84.7c-3.8-5.4-10.5-7.4-16.6-8.9-17.5-4.1-40.4-3.7-46.8-24.4-.1-.4-.7-.2-.6.2 2.4 13.9 17.5 19.9 29.6 22.4 14.5 3 41.7 5 35.7 26.9-.1.3.4.4.5.1 2.1-5.4 1.6-11.4-1.8-16.3zm-14-27.9c-6.1-3.4-12.9-5.5-19.9-6.2-9.4-1-18.8 1-27.6-3.5-.2-.1-.5.2-.2.4 4.9 2.8 10.4 3.3 16 3.4 7.8.1 15.2.2 22.6 2.7 13.9 4.7 26.3 15 27.2 30-3.8-10.2-14.3-14.9-24.2-17.8-13.7-4-31.1-4.4-41.7-15.1-.1-.1-.3 0-.2.2 7.3 9.2 20.1 10.2 30.8 12.8 13.3 3.2 29.4 6.7 35.1 20.7 0 .1.1.1.2.1 0 .9 0 1.9-.1 2.9 0 .3.4.3.5.1 3-13.4-7.8-24.8-18.5-30.7zM135 58c-13.2-18-38.6-22.3-58.2-13.4-.2.1 0 .5.2.4 10.4-4.8 22.2-6 33.3-2.8 9.9 2.8 17.5 8.7 24.4 16.1.2 0 .4-.1.3-.3zm-62.3-3.8c0-.2-.4-.3-.4 0 0 5.5-.4 10.8-2.4 15.9-1.6 4.2-4 7.9-6.1 11.8-3.2 6.1-5 12.3-4.1 19.2 0 .2.4.2.4-.1-.3-9.9 3.5-16.7 8-25.2 3.7-6.7 5.6-14 4.6-21.6zm-3.1-3.4C56.8 60 55.8 77.9 58.1 92.1c0 .2.3.1.3 0-1.5-15.3-.4-30 11.4-41 .1-.2-.1-.4-.2-.3zm-.1 6.7c-1.9 5.7-3.8 11.2-6.1 16.8-.1.2.2.3.3.1 2.7-5.2 5-11 6.1-16.8 0-.2-.3-.3-.3-.1z" data-colored="true" data-fillType="sd1" data-strokeType="none" fill="#1b141c" strokeWidth="1" opacity="1" />
                  <Path id="SvgjsPath3304" d="M121.5 73.9c-6.8-3.4-14.7-2.8-21.9-5.1-8.6-2.7-15.5-7.6-22.2-13.4-.2-.1-.4.1-.2.2 4.9 5.6 11.6 9.8 18.5 12.6 8.3 3.3 17.6 2.6 25.8 6 0 0 .1-.2 0-.3zm9.7.4c-10.4-8.1-25.3-7.2-37.7-9.8-.2 0-.2.2-.1.2 12.6 4.1 25.8 2.6 37.6 9.8.2.1.4-.1.2-.2zm-22.4-16c-10.8-.3-20-2.9-29.6-7.8-.2-.1-.4.2-.2.3 8.6 5.8 19.4 8.6 29.8 8 .4 0 .4-.5 0-.5zm15.5 5.4c-6-5.6-14-7.2-21.9-8.3-.1 0-.2.2 0 .2 7.7 1.8 15.2 3.3 21.6 8.3.3.2.5 0 .3-.2zm-4-10.8c-9.8-5.9-22.9-6.6-34.1-7.1-.2 0-.3.3-.1.4 11.6 1.9 23.1 2 33.9 7.1.3 0 .5-.3.3-.4zm-3.7-4c-6.9-4.2-15.1-6.3-23.2-5.8-.3 0-.3.4 0 .5 8.2.4 15.5 2.2 22.9 5.8.3 0 .5-.4.3-.5zm-48.9 7c-4.2 4.5-6.9 10.4-7.3 16.6 0 .2.3.2.3 0 1-6.2 3.2-11.5 7.2-16.4.1-.1-.1-.3-.2-.2zm2.3-2c-1.2 3.1-2.7 6.2-4.3 9.1-.1.1.1.2.2.1 2.1-2.8 3.5-5.8 4.4-9.2-.1-.1-.3-.1-.3 0zm.2 5.7c-1.2 5-2.5 9.6-5 14.2-1.8 3.4-3.6 6.5-4.4 10.3 0 .1.2.2.2.1 1.4-4.7 4.1-8.5 6.2-12.9 1.8-3.7 2.6-7.5 3.3-11.5 0-.3-.3-.4-.3-.2z" data-colored="true" data-fillType="hl1" data-strokeType="none" fill="#3a353a" strokeWidth="1" opacity="1" />
                </G>
                <G id="svga-beard">
                  <Path id="SvgjsPath3302" d="M83.9 145.3c.7 3.5 3.2 7.2 4.9 9.4 2 2.5 7.1 3.1 7.1 3.1v-.8s.1.8 2.4 1.3 4.6-.1 4.6-.1l1.7-1.4-.1 1.1s2.1-.1 3.7-1.1v1.1s2.7-1.6 5-6.3c2.4-4.7 3.7-5.6 2-8.3-2-3-31.1-5.2-31.3 2z" data-colored="true" data-fillType="tone" data-strokeType="none" fill={hairColor} strokeWidth="1" opacity="1" />
                  <Path id="SvgjsPath3303" d="M90.4 155c-.6-1-1-2.1-1.6-3.1-.1-.1-.3-.1-.3.1.2.7.5 1.4.9 2-.8-.7-1.5-1.5-2.1-2.4-1.6-2.3-2.3-4.9-3-7.5-.1-.2-.3-.1-.3 0 0 5.2 4 11.6 9 13.4.2.1.4-.2.2-.4-1-.7-1.9-1.3-2.8-2.1zm6.1.6c-.1-.2-.4-.1-.3.1.1.8.3 1.5.7 2.3-1.9-2.2-3.6-4.4-4.7-7.2-.1-.2-.3-.1-.3.1.6 2.4 1.8 4.8 3.5 6.7-.7-.3-1.4-.6-2-1.2-.8-.7-1.6-1.5-2.3-2.3-.1-.1-.4.1-.3.2 1.2 1.7 3 4.2 5.3 4 .4.4.9.8 1.4 1.1 0 .1.1.1.1.2.1.2.5 0 .4-.2-.5-1.2-.9-2.6-1.5-3.8zm1.4 1.5c-.2-.3-.6 0-.4.3.4.7 1 1.4 1.8 1.6.2 0 .3-.2.2-.3-.6-.6-1.2-1-1.6-1.6zm-9.8-7.1c.2.2.5-.1.4-.4-1.3-1.8-2.4-3.4-3.2-5.5-.1-.2-.4-.1-.4.1.3 2.2 1.4 4.5 3.2 5.8zm.5-1.5c.3 1 .9 2.3 1.9 2.7.2.1.4-.2.3-.4-.3-.4-.7-.7-1-1.1-.3-.4-.6-.9-.8-1.4 0-.2-.4-.1-.4.2zm13.3 7.1c-.3 1-.5 2-.9 2.9-.1.1.1.3.2.1.6-.9 1-1.9 1-3 0-.2-.3-.2-.3 0zm2-2.3c-.7 1.8-1.3 3.5-2.4 5.1-.1.2.2.4.3.3 1.3-1.4 2.5-3.3 2.6-5.2.1-.5-.4-.5-.5-.2zm.7 1.8c-.3.4-.5 1-.7 1.5-.3.5-.5.9-.9 1.4-.2.2.2.5.4.3.8-.8 1.7-1.9 1.8-3-.1-.4-.5-.4-.6-.2zm1.8.1c-.4.3-.7.8-1 1.2-.4.4-.8.8-1.2 1.1-.3.2 0 .8.3.5.5-.3 1-.7 1.4-1.2.4-.4.8-.9.9-1.5.1-.1-.2-.2-.4-.1zm5.3-6.2c.1-.3-.4-.6-.6-.2-1.4 3-2.5 6.5-5.2 8.6-.2.2.1.5.3.4 3-1.6 4.9-5.8 5.5-8.8zm1.3.4c-1.6 2.4-2.6 5.1-4.4 7.3.1-.2.1-.4.2-.6 0-.2-.2-.3-.4-.1-.3.5-.5 1.1-.7 1.6v.1c0 .2.2.4.3.2 2.7-1.9 4.3-5.3 5.3-8.4.1-.2-.2-.3-.3-.1zm2.1-5.8c0-.4-.6-.4-.6 0-.2 3.4-.8 6.6-2.5 9.6-.1.2.2.3.2.1 1.9-2.8 3.1-6.2 2.9-9.7zm-20.4 7.7c-1.5-2.4-2.8-4.5-3.4-7.3-.1-.4-.8-.2-.7.2.5 2.7 1.6 5.6 3.6 7.5.2.2.6-.1.5-.4zm2.5 3c-1.1-2.2-2.4-4.2-3.4-6.4-.1-.2-.3-.1-.3.1.7 2.3 1.7 4.8 3.3 6.6.3.2.6 0 .4-.3zm1.2.5c-.1-.2-.2-.4-.2-.6-.1-.2-.1-.5-.2-.7-.1-.2-.1-.4-.2-.6-.2-.7-.2-1.3-.4-2-.1-.2-.4-.2-.4.1-.1 1.4.5 2.8 1.1 4 .1.1.4 0 .3-.2zm-8.9-9.1c-.4-1-1-2-1.4-3.1-.1-.1-.3-.1-.2.1.3 1.1.7 2.2 1.4 3.1 0 .1.3.1.2-.1zm11.5 10.2c.2-1.3.3-2.6.4-3.9 0-.1-.1-.1-.1 0-.1 1.3-.4 2.6-.4 3.9h.1zm-.7-1.5c0-.2-.4-.2-.4 0-.3.8-.3 1.8-.4 2.7-.4-.6-.8-1.2-1.2-1.9-.1-.1-.3 0-.2.1 0 .1.1.3.1.4 0 .1.1.2.1.3v.1c0 .1.1.1.1.2.3.8.8 1.6 1.5 2.1.1.1.3 0 .2-.2-.1-.3-.3-.6-.5-.8.5-.9.9-2 .7-3zm3.1-4.3c.4-1.6.5-3.3.6-5 0-.5-.7-.5-.7 0-.1 1.6-.3 3.3-.4 4.9 0 .4.5.4.5.1zm1.7 3.2c.8-1.7 1.2-3.7 1.4-5.6 0-.2-.4-.2-.4 0-.2 1.9-.7 3.6-1.3 5.4 0 .2.3.3.3.2zm3.8-3.1c.7-2 .9-4.2.7-6.4 0-.2-.3-.2-.3 0 .1 2.1-.3 4.2-.7 6.3 0 .2.3.3.3.1zM98.5 146c0-.7-.2-1.4-.2-2.1 0-.2-.3-.1-.3 0 .1.7.1 1.5.3 2.1 0 .1.2.1.2 0zm-1.9 1.2c0-1.6-.3-3.1-.2-4.7 0-.3-.4-.3-.4 0 0 1.6-.1 3.2.3 4.7 0 .3.3.3.3 0zm4.6 9.5c-.1-.2-.4-.2-.4 0-.2.6-.3 1.3-.3 1.9 0 .2.3.3.4.1.2-.6.4-1.4.3-2z" data-colored="true" data-fillType="sd1" data-strokeType="none" fill="#1b141c" strokeWidth="1" opacity="1" />
                </G>
              </G>

              {/* Glasses */}
              <G id="svga-group-glasses-single-move" transform="matrix(1,0,0,1,0,0)">
                <G id="svga-group-glasses-single" transform="matrix(1,0,0,1,0,0)"/>
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default Avatar;

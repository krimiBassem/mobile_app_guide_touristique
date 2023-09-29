import * as React from "react";
import Svg, {
    Defs,
    LinearGradient,
    Stop,
    Path,
    G,
    Ellipse,
    Text,
    TSpan,
} from "react-native-svg";

const Pin = (props) => (


<Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    {...props}
>
    <Defs>
        <LinearGradient
            id="a"
            x1={0.5}
            y1={1}
            x2={0.5}
            gradientUnits="objectBoundingBox"
        >
            <Stop offset={0.059} stopColor="#f4b652" />
            <Stop offset={0.709} stopColor="#e38e39" />
        </LinearGradient>
    </Defs>
    <Path
        data-name="Trac\xE9 2708"
        d="M39.314 52.2a18.772 18.772 0 1 0-35.408 8.673H3.87l8.33 15.788 5.975 11.321a2.667 2.667 0 0 0 4.715 0l5.975-11.321L37.2 60.873h-.021a18.614 18.614 0 0 0 2.135-8.673Z"
        transform="translate(-1.771 -25.134)"
        fill="url(#a)"
    />
    <G data-name="Groupe 1467">
        <Path
            data-name="Trac\xE9 2704"
            d="M10.201 44.322c3.411-3.851 9.754-10.487 13.047-14.446 2.773-4.335-1.735-9.2-6.062-7.814-5.466 1.75-4.484 9.346.681 10.215l-3.255 3.572a9.7 9.7 0 1 1 11.371-2.277l-12.5 13.725Z"
            fill="#fff"
        />
    </G>
    <Path
        data-name="Trac\xE9 2709"
        d="M14.809 33.832a8.5 8.5 0 0 1-3.319-6.073 7.425 7.425 0 0 1 1.59-5.107 7.626 7.626 0 0 1 5.878-2.622 7.486 7.486 0 0 1 5.809 2.967 7.034 7.034 0 0 1 1.176 4.485 8.121 8.121 0 0 1-1.8 4.072c-3.32 4.71-6.69 8.088-11.356 13.231l-.33.364"
        fill="none"
        stroke="#3b7677"
        strokeMiterlimit={10}
        strokeDasharray={4}
    />
    <Ellipse
        data-name="Ellipse 130"
        cx={10.27}
        cy={10.249}
        rx={10.27}
        ry={10.249}
        transform="translate(23.325 .333)"
        fill="#e49038"
    />
    <Text
        data-name={10}
        transform="translate(30 16)"
        fill="#fff"
        fontSize={13}
        fontFamily="SegoeUI, Segoe UI"
    >
        <TSpan x={0} y={0}>
            {"1"}
        </TSpan>
    </Text>
    <Path
        data-name="Trac\xE9 2710"
        d="M39.314 52.2a18.772 18.772 0 1 0-35.408 8.673H3.87l8.33 15.788 5.975 11.321a2.667 2.667 0 0 0 4.715 0l5.975-11.321L37.2 60.873h-.021a18.614 18.614 0 0 0 2.135-8.673Z"
        transform="translate(-1.771 -25.134)"
        fill="url(#a)"
    />
    <G data-name="Groupe 1468">
        <Path
            data-name="Trac\xE9 2704"
            d="M10.201 44.322c3.411-3.851 9.754-10.487 13.047-14.446 2.773-4.335-1.735-9.2-6.062-7.814-5.466 1.75-4.484 9.346.681 10.215l-3.255 3.572a9.7 9.7 0 1 1 11.371-2.277l-12.5 13.725Z"
            fill="#fff"
        />
    </G>
    <Path
        data-name="Trac\xE9 2711"
        d="M14.809 33.832a8.5 8.5 0 0 1-3.319-6.073 7.425 7.425 0 0 1 1.59-5.107 7.626 7.626 0 0 1 5.878-2.622 7.486 7.486 0 0 1 5.809 2.967 7.034 7.034 0 0 1 1.176 4.485 8.121 8.121 0 0 1-1.8 4.072c-3.32 4.71-6.69 8.088-11.356 13.231l-.33.364"
        fill="none"
        stroke="#3b7677"
        strokeMiterlimit={10}
        strokeDasharray={3}
    />
    <Ellipse
        data-name="Ellipse 131"
        cx={10.27}
        cy={10.249}
        rx={10.27}
        ry={10.249}
        transform="translate(23)"
        fill="#e49038"
    />
    <Text
        data-name={2}
        transform="translate(30 15)"
        fill="#fff"
        fontSize={12}
        fontFamily="SegoeUI, Segoe UI"
    >
        <TSpan x={0} y={0}>
            {props.order}
        </TSpan>
    </Text>
</Svg>
)

export default Pin;

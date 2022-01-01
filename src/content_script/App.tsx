import React, { useEffect, useState, useRef } from 'react';
import style from './index.module.styl'

interface IPos {
    show: boolean;
    translateX: number;
    translateY: number;
    text?: string;
}

export default function (): JSX.Element {
    const [btnPos, setBtnPos] = useState<IPos>({
        show: false,
        translateX: 0,
        translateY: 0,
    });
    const [boxPos, setBoxPos] = useState<IPos>({
        show: false,
        translateX: 0,
        translateY: 0,
        text: '',
    });
    const btnRef = useRef<HTMLDivElement>(null)
    const boxRef = useRef<HTMLDivElement>(null)


    const mouseup = function (e: MouseEvent): void {
        const text = window.getSelection()?.toString().trim();
        let left = e.pageX - window.pageXOffset + ( window.innerWidth - e.clientX < 40 ? -40 : 0 );
        let top = e.pageY - window.pageYOffset + 10 + ( window.innerHeight - e.clientY < 40 ? -40 : 0 );
        setBtnPos((o) => {
            return {
                ...o,
                show: !!text,
                translateX: left < 0 ? 0 : left,
                translateY: top < 0 ? 0 : top,
            };
        });
    };

    useEffect(() => {
        document.addEventListener('mouseup', mouseup);
        return () => {
            document.removeEventListener('mouseup', mouseup);
        };
    }, []);

    const mousedown = function (e: MouseEvent): void {
        let showBtn = false
        let showBox = false
        const text = window.getSelection()?.toString().trim();
        if (boxRef.current?.contains(e.target as HTMLElement)) {
            showBox = true
            showBtn = false
        }
        if (btnRef.current?.contains(e.target as HTMLElement)) {
            showBox = true
            showBtn = false
            let left = e.pageX - window.pageXOffset + ( window.innerWidth - e.clientX < 250 ? -250 : 0 );
            let top = e.pageY - window.pageYOffset + 10 + ( window.innerHeight - e.clientY < 300 ? -300 : 0 );
            setBoxPos(() => {
                return {
                    translateX: left < 0 ? 0 : left,
                    translateY: top < 0 ? 0 : top,
                    text,
                    show: showBox,
                };
            });
        } else {
            setBoxPos((o) => {
                return {
                    ...o,
                    show: showBox,
                };
            });
        }
        setBtnPos((o) => {
            return {
                ...o,
                show: showBtn,
            };
        });
    };

    useEffect(() => {
        document.addEventListener('mousedown', mousedown);
        return () => {
            document.removeEventListener('mousedown', mousedown);
        };
    }, []);

    return (
        <div>
            <div
                ref={btnRef}
                className={style.btn}
                style={{
                    display: btnPos.show ? 'block' : 'none',
                    position: 'fixed',
                    zIndex: 99999,
                    left: 0,
                    top: 0,
                    transform: `translateX(${btnPos.translateX}px) translateY(${btnPos.translateY}px)`,
                }}
            >
                弹
            </div>
            <div
                ref={boxRef}
                className={style.box}
                style={{
                    display: boxPos.show ? 'block' : 'none',
                    position: 'fixed',
                    zIndex: 99999,
                    left: 0,
                    top: 0,
                    transform: `translateX(${boxPos.translateX}px) translateY(${boxPos.translateY}px)`,
                }}
            >
                {boxPos.text}
            </div>
        </div>
    );
}

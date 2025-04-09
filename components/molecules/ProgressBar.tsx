'use client';

import { useState, useEffect } from 'react';

/**
 * 페이지 진행 상태를 표시하는 프로그레스 바컴포넌트입니다.
 *
 * @description
 * 전체 페이지 수(totalSteps)와 현재 단계(currentStep)를 props로 받아서 프로그레스바로 보여줍니다.
 *
 * @param {number} props.totalSteps - 전체 단계 수
 * @param {number} props.currentStep - 현재 단계 (1부터 시작)
 *
 * @example
 * // 사용 예시
 * <ProgressBar totalSteps={4} currentStep={2} />
 */

const ProgressBar = ({ totalSteps, currentStep }:{
    totalSteps: number;
    currentStep: number;
  }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (typeof totalSteps === 'number' && typeof currentStep === 'number' && totalSteps > 0) {
            setProgress((currentStep / totalSteps) * 100);
        }
    }, [currentStep, totalSteps]);

    return (
        <div className='md:w-[1920px] md:h-[128px] w-[375px] h-[96px] bg-GrayScale-50 p-6 md:pt-8 md:pb-8 md:pl-[260px] md:pr-[260px] '>
            <h1 className="text-[18px] lg:text-[24px] md:text-[24px] text-Black-400 font-semibold mb-4">견적요청</h1>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                    className="bg-Primay-Blue-300 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
package com.example.CureMap.domain;

public enum UnderlyingDisease {
    DIABETES("당뇨병"),
    IMMUNE_DEFICIENCY("면역결핍상태"),
    VOIDING_DYSFUNCTION("배뇨장애"),
    CONGENITAL_URINARY_TRACT_MALFORMATION("선천성 요로계 기형"),
    UROLITHIASIS("요로 결석"),
    PROSTATE_DISEASE("전립선 질환"),
    RENAL_DISEASE("신장 질환");

    private final String korean;

    UnderlyingDisease(String korean) {
        this.korean = korean;
    }

    public String getKorean() {
        return korean;
    }
}

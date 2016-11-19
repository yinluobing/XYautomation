#!/usr/bin/env bash
year=`date +%Y`
mkdir 'zt/'$year
for ((i=1; i<=12; ++i))
do  
	mkdir 'zt/'$year'/'$i
    if (( i==1 || i==3 || i==5 || i==7 || i==8 || i==10 || i==12 )); then
    	maxday=31
    elif (( i == 2 )); then
    	maxday=28
		if (( $((year%4==0&&year%100!=0||year%400==0))==1 )); then
				maxday=29
			else
				maxday=28
		fi
	else
		maxday=30
    fi
    for((y=1;y<=$maxday;++y))
    do
   		mkdir 'zt/'$year'/'$i'/'$y
    done
done
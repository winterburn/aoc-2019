import os
import numpy
import math
import pprint

asteroids = []
with open('./day10/day10_test2.txt') as f:
    for cnt, line in enumerate(f):
        for idx, symbol in enumerate([x for x in line.strip()]):
            if symbol == '#':
                asteroids.append([idx, cnt])
planet = [0, [0, 0], {}]
for asteroid in asteroids:
    kks = {}
    for roid in asteroids:
        if asteroid == roid:
            continue
        x = asteroid[0] - roid[0]
        y = asteroid[1] - roid[1]
        if x != 0:
            kk = y/x
        else:
            kk = 1000
        if kk not in kks:
            kks[kk] = {'negative': [], 'positive': []}
        if x != 0:
            if x > 0:
                kks[kk]['positive'].append([roid[0], roid[1], math.hypot(x, y)])
            elif x < 0:
                kks[kk]['negative'].append([roid[0], roid[1], math.hypot(x, y)])
        else:
            if y > 0:
                kks[kk]['positive'].append([roid[0], roid[1], math.hypot(x, y)])
            elif y < 0:
                kks[kk]['negative'].append([roid[0], roid[1], math.hypot(x, y)])
        kks[kk]['negative'].sort(key=lambda x: x[2])
        kks[kk]['positive'].sort(key=lambda x: x[2])
    count = 0
    for kk in kks:
        if kks[kk]['negative']:
            count += 1
        if kks[kk]['positive']:
            count += 1
    if planet[0] < count:
        planet = [count, [asteroid[0], asteroid[1]], kks]

pprint.pprint(planet[0])
pprint.pprint(planet[1])
planet_sorted_keys = [float(x) for x in planet[2]]
planet_sorted_keys.sort()
planet_sorted_keys_reversed = planet_sorted_keys.copy()
planet_sorted_keys_reversed.reverse()
print(planet_sorted_keys)
count = 0
for key in planet_sorted_keys_reversed:
    if planet[2][key]['positive']:
        result = planet[2][key]['positive'].pop(0)
        print(result)
for key in planet_sorted_keys_reversed:
    if planet[2][key]['positive']:
        result = planet[2][key]['positive'].pop(0)
        print(result)

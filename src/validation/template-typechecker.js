class Type {
    constructor(name, supertype) {
        this.name = name;
        this.supertype = supertype;
    }

    unify(other) {
        return false;
    }

    toBeInstanciated() {
        return false;
    }

    isFullyInstantiated() {
        return true;
    }

    get() {
        return this;
    }

    toString() {
        return "";
    }

    getSupertypes() {
        let types = [this];
        let supertype = this.supertype;
        while (supertype) {
            types.push(supertype);
            supertype = supertype.supertype;
        }
        return types;
    }
}

class SimpleType extends Type {
    constructor(name, supertype) {
        super(name, supertype);
    }

    unify(other) {
        if (other.toBeInstanciated())
            return other.unify(this);
        else
            return this.name == other.get().name;
    }

    toString() {
        return this.name;
    }
}

const VALUE_SUPERTYPE = new SimpleType("value", null);

class SetType extends Type {
    constructor(setOf) {
        super("set", VALUE_SUPERTYPE);
        this.setOf = setOf;
    }

    unify(other) {
        if (other.toBeInstanciated())
            return other.unify(this);
        else
            return other.get().name == "set" && this.setOf.unify(other.get().setOf);
    }

    isFullyInstantiated() {
        return this.setOf.isFullyInstantiated();
    }

    toString() {
        return `set(${this.setOf.toString()})`
    }
}

class UserConceptType extends Type {
    constructor(conceptName) {
        super("user", VALUE_SUPERTYPE);
        this.conceptName = conceptName;
    }

    unify(other) {
        if (other.toBeInstanciated())
            return other.unify(this);
        else
            return other.get().name == "user" && other.get().conceptName == this.conceptName;
    }

    toString() {
        return `user-concept(${this.conceptName})`
    }
}

class FunctionType extends Type {
    constructor(argTypes, returnType) {
        super("fn", null);
        this.argTypes = argTypes;
        this.returnType = returnType;
    }

    unify(other) {
        if (other.toBeInstanciated()) {
            return other.unify(this);
        } else {
            if (other.name == "fn" && other.argTypes.length == this.argTypes.length) {
                for (let i = 0; i < this.argTypes.length; i++) {
                    if (!other.argTypes[i].unify(this.argTypes[i]))
                        return false;
                }

                return other.returnType == this.returnType;
            }

            return false;
        }
    }

    isFullyInstantiated() {
        for (argType of this.argTypes) {
            if (!argType.isFullyInstantiated())
                return false;
        }

        return this.returnType.isFullyInstantiated();
    }

    toString() {
        let args = this.argTypes.map(t => t.toString()).join(", ");
        return `function(${args} -> ${this.returnType.toString()})`;
    }
}

class InferredType extends Type {
    constructor() {
        super("inferred");
        this.innerType = null;
        this.siblings = [];
    }

    unify(other) {
        if (other.name == "inferred") {
            this.siblings.push(other);
            other.siblings.push(this);
        }

        if (this.toBeInstanciated()) {
            if (!other.toBeInstanciated()) {
                this.innerType = other.get();
                return this.assignToAllSiblings(this);
            } else {
                return true;
            }
        } else {
            // Check if `this` and `other` either :
            // - are the same
            // - have a common supertype
            // In the latter case, assign them their common subtype
            if (this.innerType.unify(other.get())) {
                return true;
            } else {
                let thisSupertypes = this.getSupertypes();
                let otherSupertypes = other.getSupertypes();
                let communSupertype = null;

                for (let st of thisSupertypes) {
                    for (let stOther of otherSupertypes) {
                        if (st.unify(stOther)) {
                            communSupertype = st;
                            break;
                        }
                    }
                    if (communSupertype)
                        break;
                }

                if (communSupertype) {
                    this.innerType = communSupertype;
                    return this.assignToAllSiblings(communSupertype);
                } else {
                    return false;
                }
            }
        }
    }

    toBeInstanciated() {
        return !this.innerType;
    }

    isFullyInstantiated() {
        if (this.innerType) {
            return this.innerType.isFullyInstantiated();
        } else {
            return false;
        }
    }

    get() {
        return this.innerType;
    }

    toString() {
        return this.innerType ? this.innerType.toString() : "?";
    }

    getSupertypes() {
        return this.innerType ? this.innerType.getSupertypes() : [];
    }

    assignToAllSiblings(type) {
        let result = true;
        for (let sibling of this.siblings) {
            if (!sibling.get().unify(type)) {
                if (!sibling.unify(type)) {
                    result = false;
                }
            }
        }
        return result;
    }
}

class EnvLinkedList {
    constructor(name, type, next = null) {
        this.name = name;
        this.type = type;
        this.next = next;
    }

    findType(name) {
        for (let node of this.iterator()) {
            if (node.name == name)
                return node.type;
        }
        return null;
    }

    iterator() {
        function* makeIterator(list) {
            let obj = list;

            while (obj) {
                yield obj;
                obj = obj.next;
            }
        }

        return makeIterator(this);
    }

    static toLinkedList(pairList) {
        if (pairList.length == 0) {
            return null;
        } else {
            let firstNode = new EnvLinkedList(pairList[0][0], pairList[0][1]);
            let node = firstNode;

            for (let i = 1; i < pairList.length; i++) {
                let newNode = new EnvLinkedList(pairList[i][0], pairList[i][1]);
                node.next = newNode;
                node = newNode;
            }

            return firstNode;
        }
    }
}

const STRING_TYPE = new SimpleType("string", VALUE_SUPERTYPE);
const BOOL_TYPE = new SimpleType("bool", VALUE_SUPERTYPE);
const NUMBER_TYPE = new SimpleType("number", VALUE_SUPERTYPE);

const BUILTIN_FUNCTIONS = EnvLinkedList.toLinkedList([
    ["add", new FunctionType([NUMBER_TYPE, NUMBER_TYPE], NUMBER_TYPE)],
    ["sub", new FunctionType([NUMBER_TYPE, NUMBER_TYPE], NUMBER_TYPE)],
    ["prod", new FunctionType([NUMBER_TYPE, NUMBER_TYPE], NUMBER_TYPE)],
    ["div", new FunctionType([NUMBER_TYPE, NUMBER_TYPE], NUMBER_TYPE)],
    ["and", new FunctionType([BOOL_TYPE, BOOL_TYPE], BOOL_TYPE)],
    ["or", new FunctionType([BOOL_TYPE, BOOL_TYPE], BOOL_TYPE)],
    ["not", new FunctionType([BOOL_TYPE], BOOL_TYPE)],
    ["at", new FunctionType([new SetType(VALUE_SUPERTYPE)], VALUE_SUPERTYPE)],
    ["rev", new FunctionType([new SetType(VALUE_SUPERTYPE)], new SetType(VALUE_SUPERTYPE))],
    ["range", new FunctionType([NUMBER_TYPE, NUMBER_TYPE, NUMBER_TYPE], new SetType(NUMBER_TYPE))],
    ["join", new FunctionType([new SetType(STRING_TYPE), STRING_TYPE], STRING_TYPE)],
    ["chars", new FunctionType([STRING_TYPE, new SetType(STRING_TYPE)], new SetType(STRING_TYPE))]
]);

export function typecheckTemplate(userConcepts, templateInstances) {
    let globalEnv = BUILTIN_FUNCTIONS;
    let validFunctionConcepts = [];
    let validGlobalVarConcepts = [];

    let errors = [];

    // 1. Create global functions giving them polymorphic return types at first,
    //    allowing them to be inferred during the remaining phases.
    for (let instance of templateInstances) {
        let concept = instance.concept.getValue();

        if (concept.name == "function") {
            let name = getAttributeValue(concept, "name");

            if (name) {
                if (!globalEnv.findType(name.value)) {
                    let paramTypes = [];
                    let valid = true;

                    let paramSet = getAttributeValue(concept, "params");

                    if (paramSet) {
                        for (let param of paramSet.value) {
                            if (getAttributeValue(param, "name")) {
                                // has a name
                                let paramType = decodeType(getAttributeValue(param, "type"));
                                if (paramType) {
                                    paramTypes.push(paramType);
                                } else {
                                    errors.push(`Invalid parameter type in function ${name.value}`);
                                    valid = false;
                                }
                            } else {
                                errors.push(`Function ${name.value} has an unnamed parameter`);
                                valid = false;
                            }
                        }
                    } else {
                        errors.push(`Function ${name.value} has no parameters`);
                        valid = false;
                    }

                    if (valid) {
                        globalEnv = new EnvLinkedList(
                            name.value,
                            new FunctionType(paramTypes, new InferredType()),
                            globalEnv);
                        validFunctionConcepts.push(concept);
                    }
                } else {
                    errors.push(`Duplicate symbol ${name.value}`);
                }
            } else {
                errors.push("Unnamed function declared");
            }
        }
    }

    // 2. Do the same with global variables; create entries in the `globalVars` object
    //    to allow referencing a variable defined later on.
    for (let instance of templateInstances) {
        let concept = instance.concept.getValue();

        if (concept.name == "variable-def") {
            let name = getAttributeValue(concept, "name");

            if (name) {
                if (!globalEnv.findType(name.value)) {
                    // not already defined
                    globalEnv = new EnvLinkedList(
                        name.value,
                        new InferredType(),
                        globalEnv);
                    validGlobalVarConcepts.push(concept);
                } else {
                    errors.push(`Duplicate symbol ${name.value}`);
                }
            } else {
                errors.push("Unnamed variable declared");
            }
        }
    }

    // 3. Infer function return types.
    for (let fnConcept of validFunctionConcepts) {
        let name = getAttributeValue(fnConcept, "name").value;
        let fnType = globalEnv.findType(name);
        let returnValue = getAttributeValue(fnConcept, "returns");
        let paramSet = getAttributeValue(fnConcept, "params");

        let functionEnv = globalEnv; // will contain param types

        let i = 0;
        for (let param of paramSet.value) {
            let paramName = getAttributeValue(param, "name").value;
            let paramType = fnType.argTypes[i];
            // Add param to local environment
            functionEnv = new EnvLinkedList(paramName, paramType, functionEnv);
            i++;
        }

        // `returnValue` contains a "value" prototype with a concrete
        // concept in its "value" property.
        let returnType = computeValueType(returnValue.value, functionEnv, userConcepts, errors);

        if (returnType) {
            // Instantiate type
            let result = fnType.returnType.unify(returnType);
            
            if (!result) {
                errors.push(`Type mismatch in function ${name}: returns ${returnType.toString()}, expected ${fnType.returnType.toString()}`)
            }
        } else {
            errors.push(`Could not infer return type of function ${name}`);
        }
    }

    // 4. Infer global variable types.
    for (let varConcept of validGlobalVarConcepts) {
        let name = getAttributeValue(varConcept, "name").value;
        let varValue = getAttributeValue(varConcept, "value");
        let varType = globalEnv.findType(name);

        if (varValue) {
            varValue = varValue.value;
            let computedType = computeValueType(varValue, globalEnv, userConcepts, errors);

            if (computedType) {
                // Instantiate type
                let result = varType.unify(computedType);
                            
                if (!result) {
                    errors.push(`Type mismatch in variable ${name}: is a ${computedType.toString()}, expected ${varType.toString()}`)
                }
            } else {
                errors.push(`Could not infer type of variable ${name}`);
            }
        } else {
            errors.push(`Variable ${name} has no value`);
        }
    }

    // 5. Validate "file" and "for-each-file" instances.
    for (let instance of templateInstances) {
        let concept = instance.concept.getValue();

        if (concept.name == "for-each-file") {
            let varName = getAttributeValue(concept, "varname");
            let inExp = getAttributeValue(concept, "in");
            let file = getAttributeValue(concept, "file");

            if (varName && inExp) {
                varName = varName.value;
                let inType = computeValueType(inExp.value, globalEnv, userConcepts, errors);
                let itemType = new InferredType();

                if (inType && inType.unify(new SetType(itemType))) {
                    let loopEnv = new EnvLinkedList(varName, itemType, globalEnv);
                    typecheckFile(file, loopEnv, userConcepts, errors);
                } else {
                    errors.push("Expected set in for-each-file, after \"in\"");
                }
            } else {
                errors.push("Incomplete for-each-file definition");
            }
        } else if (concept.name == "file") {
            typecheckFile(concept, globalEnv, userConcepts, errors);
        }
    }

    // 6. Make sure all types have been effectively inferred.
    for (let def in globalEnv.iterator()) {
        if (!def.type.isFullyInstantiated()) {
            errors.push(`Type of ${def.name} could not be fully instantiated`);
        }
    }

    return errors;
}

function typecheckFile(file, env, userConcepts, errors) {
    let fileName = getAttributeValue(file, "name");
    let contents = getAttributeValue(file, "contents");

    if (fileName && contents) {
        fileName = fileName.value;
        contents = contents.value;

        let fileNameType = computeValueType(fileName, env, userConcepts, errors);
        let contentsType = computeValueType(contents, env, userConcepts, errors);

        if (fileNameType && fileNameType.getSupertypes().find(t => t.unify(VALUE_SUPERTYPE))) {
            if (!(contentsType && contentsType.getSupertypes().find(t => t.unify(VALUE_SUPERTYPE)))) {
                errors.push("File contents is not a value");
            }
        } else {
            errors.push("File name is not a value");
        }
    } else {
        errors.push("Incomplete file definition");
    }
}

function decodeType(typeConcept) {
    if (typeConcept) {
        let name = typeConcept.value.name;

        switch (name) {
            case "string-type":
                return STRING_TYPE;
            case "number-type":
                return NUMBER_TYPE;
            case "bool-type":
                return BOOL_TYPE;
            case "set-type":
                return new SetType(decodeType(getAttributeValue(typeConcept.value, "set-of")));
            case "user-concept-type":
                {
                    let userConceptName = getAttributeValue(typeConcept.value, "concept-name");
                    if (userConceptName)
                        return new UserConceptType(userConceptName.value);
                    else
                        return null;
                }
        }
    }

    return null;
}

function computeValueType(valueConcept, env, userConcepts, errors) {
    if (!valueConcept)
        return null;
    
    if (valueConcept.nature == "prototype") {
        valueConcept = valueConcept.value;
    }
    
    switch (valueConcept.name) {
        case "number-literal":
            return NUMBER_TYPE;
        
        case "bool-literal":
            return BOOL_TYPE;
        
        case "text":
            // TODO check placeholders
            return STRING_TYPE;
        
        case "for-each":
            return computeForEachType(valueConcept, env, userConcepts, errors);

        case "condition":
            return computeConditionType(valueConcept, env, userConcepts, errors);

        case "let":
            return computeLetType(valueConcept, env, userConcepts, errors);

        case "sequence":
            return computeSequenceType(valueConcept, env, userConcepts, errors);

        case "call":
            return computeCallType(valueConcept, env, userConcepts, errors);

        case "concept-set":
            return computeConceptSetType(valueConcept, env, userConcepts, errors);

        case "member-access":
            return computeMemberAccessType(valueConcept, env, userConcepts, errors);

        case "var":
            return computeVarType(valueConcept, env, userConcepts, errors);
    
        default:
            break;
    }
}

function computeForEachType(forEachConcept, env, userConcepts, errors) {
    let forEachIn = getAttributeValue(forEachConcept, "in").value;
    let forEachInType = computeValueType(forEachIn, env, userConcepts, errors);
    let itemType = new InferredType();

    if (forEachInType && forEachInType.unify(new SetType(itemType))) {
        let iteratorName = getAttributeValue(forEachConcept, "varname");

        if (iteratorName) {
            iteratorName = iteratorName.value;
            let loopEnv = new EnvLinkedList(iteratorName, itemType, env);
            let valueType = computeValueType(
                getAttributeValue(forEachConcept, "map-to").value,
                loopEnv,
                userConcepts,
                errors);

            if (valueType)
                return new SetType(valueType);
            else
                return null;
        } else {
            errors.push("Unnamed iterator in for-each");
        }
    } else {
        errors.push("Expected set in for-each, after \"in\"");
    }

    return null;
}

function computeConditionType(condConcept, env, userConcepts, errors) {
    let branchSet = getAttributeValue(condConcept, "branches");
    let elseBranch = getAttributeValue(condConcept, "else");

    if (branchSet && elseBranch) {
        let branchType = new InferredType();

        // Infer branch types
        for (let branch of branchSet.value) {
            let ifVal = getAttributeValue(branch, "if");
            let thenVal = getAttributeValue(branch, "then");

            if (ifVal && thenVal) {
                let ifType = computeValueType(ifVal.value, env, userConcepts, errors);

                if (ifType.unify(BOOL_TYPE)) {
                    let thenType = computeValueType(thenVal.value, env, userConcepts, errors);
                    let result = thenType.unify(branchType);

                    if (!result)
                        errors.push(`Type mismatch in condition: ${branchType.toString()} vs ${thenType.toString()}`)
                } else {
                    errors.push(`Condition must be bool, received ${ifType.toString()} instead`);
                }
            } else {
                errors.push("Incomplete branch in condition");
            }
        }

        // Infer "else" type
        let elseType = computeValueType(elseBranch.value, env, userConcepts, errors);
        if (!elseType.unify(branchType))
            errors.push(`Type mismatch in condition: ${branchType.toString()} vs ${elseType.toString()}`)
        
        return branchType;
    } else {
        errors.push("Missing branches in condition");
    }

    return null;
}

function computeLetType(letConcept, env, userConcepts, errors) {
    let defSet = getAttributeValue(letConcept, "defs");
    let inExp = getAttributeValue(letConcept, "in");

    if (defSet && inExp) {
        let defs = defSet.value;
        let letEnv = env;
        let validDefs = [];

        // 1. Add all variables to `letEnv` with uninstantiated types
        for (let def of defs) {
            let defName = getAttributeValue(def, "name");
            let defVal = getAttributeValue(def, "value");

            if (defName && defVal) {
                defName = defName.value;

                // if it doesn't already exist
                if (!letEnv.findType(defName)) {
                    letEnv = new EnvLinkedList(defName, new InferredType(), letEnv);
                    validDefs.push({ name: defName, value: defVal.value});
                } else {
                    errors.push(`Duplicate variable definition: ${defName}`);
                }
            } else {
                errors.push("Incomplete let variable definition");
            }
        }

        // 2. Infer all variable types
        for (let { name, value } of validDefs) {
            let thisDefType = computeValueType(value, letEnv, userConcepts, errors);

            if (thisDefType) {
                let expType = letEnv.findType(name);
                if (!expType.unify(thisDefType))
                    errors.push(`Type mismatch in definition: ${expType.toString()} vs ${thisDefType.toString()}`)
            }
        }

        // 3. Infer final expression type
        return computeValueType(inExp.value, letEnv, userConcepts, errors);

    } else {
        errors.push("Incomplete let");
    }

    return null;
}

function computeSequenceType(seqConcept, env, userConcepts, errors) {
    let itemSet = getAttributeValue(seqConcept, "items");
    let itemType = new InferredType();

    if (itemSet) {
        let items = itemSet.value;
        for (let item of items) {
            let thisItemType = computeValueType(item, env, userConcepts, errors);

            if (thisItemType) {
                let result = itemType.unify(thisItemType);

                if (!result)
                    errors.push(`Type mismatch in sequence: ${itemType.toString()} vs ${thisItemType.toString()}`)
            } else {
                return null;
            }
        }
        return new SetType(itemType);
    } else {
        errors.push("Sequence is empty");
    }

    return null;
}

function computeCallType(callConcept, env, userConcepts, errors) {
    let fnName = getAttributeValue(callConcept, "fn-name");
    let argSet = getAttributeValue(callConcept, "args");

    if (fnName && argSet) {
        let calleeType = env.findType(fnName.value);

        if (calleeType.name == "fn") {
            let argList = argSet.value;

            if (argList.length == calleeType.argTypes.length) {
                // Check that argument types match
                for (let i = 0; i < argList.length; i++) {
                    let argType = computeValueType(argList[i], env, userConcepts, errors);
                    if (argType && !argType.unify(calleeType.argTypes[i])) {
                        errors.push(`Type mismatch in call: ${calleeType.argTypes[i].toString()} vs ${argType.toString()}`)
                    }
                }

                // Call return type = function return type
                return calleeType.returnType;
            } else {
                errors.push(`Mismatched parameters : attempting to call ${fnName.value} with the wrong number of arguments`);
            }
        } else {
            errors.push(`Attempting to call ${fnName.value}, which is not a function`);
        }
    } else {
        errors.push("Incomplete call");
    }

    return null;
}

function computeConceptSetType(callConcept, env, userConcepts, errors) {
    let conceptName = getAttributeValue(callConcept, "concept-name");

    if (conceptName) {
        conceptName = conceptName.value;

        // if the concept exists
        if (findConcept(userConcepts, conceptName) != null) {
            return new SetType(new UserConceptType(conceptName));
        } else {
            errors.push(`User concept does not exist: ${conceptName}`);
        }
    } else {
        errors.push("Incomplete concept set");
    }

    return null;
}

function computeMemberAccessType(memberAccessConcept, env, userConcepts, errors) {
    let objectToAccess = getAttributeValue(memberAccessConcept, "object");
    let attrName = getAttributeValue(memberAccessConcept, "attr-name");

    if (objectToAccess && attrName) {
        attrName = attrName.value;

        let objType = computeValueType(objectToAccess, env, userConcepts, errors);
        if (objType) {
            if (objType.get() != null) {
                if (objType.get().name == "user") {
                    let accessedConcept = findConcept(userConcepts, objType.get().conceptName);

                    if (accessedConcept) {
                        let returnedAttr = accessedConcept.attributes.find(a => a.name == attrName);

                        if (returnedAttr) {
                            return getUserAttributeType(returnedAttr);
                        } else {
                            errors.push(`User concept ${objType.get().conceptName} has no attribute ${attrName}`);
                        }
                    } else {
                        errors.push(`User concept ${objType.get().conceptName} not found`);
                    }
                }
            } else {
                errors.push("Dereferencing an object whose type is not yet known at this stage");
            }
        }
    } else {
        errors.push("Incomplete member access");
    }

    return null;
}

function computeVarType(varConcept, env, userConcepts, errors) {
    let varName = getAttributeValue(varConcept, "name");

    if (varName) {
        varName = varName.value;
        let varType = env.findType(varName);

        if (varType) {
            return varType;
        } else {
            errors.push(`Undefined variable ${varName}`);
        }
    } else {
        errors.push("Empty variable name")
    }

    return null;
}

function getAttributeValue(conceptValue, name) {
    let attribute = conceptValue.attributes.find((c) => c.name === name);

    if (attribute) {
        return attribute.value;
    } else {
        return null;
    }
}

function findConcept(userConcepts, name) {
    return userConcepts.find(c => c.name == name);
}

function getUserAttributeType(attribute) {
    return decodeTypeFromUserConcepts(attribute.target);
}

function decodeTypeFromUserConcepts(target) {
    switch (target.name) {
        case "string":
            return STRING_TYPE;
        case "number":
            return NUMBER_TYPE;
        case "boolean":
            return BOOL_TYPE;
        case "set":
            return new SetType(decodeTypeFromUserConcepts(target.accept));
        case "reference":
            return decodeTypeFromUserConcepts(target.accept);
        default:
            return new UserConceptType(target.name);
    }
}
